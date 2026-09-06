import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { submitPost } from "./actions";
import { PostsPage } from "@/lib/types";
import { useSession } from "@/app/(main)/components/SessionProvider";

export const useSubmitPostMutation = () => {
  const queryClient = useQueryClient();

  const { user } = useSession();

  const mutation = useMutation({
    mutationFn: submitPost,

    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters = {
        queryKey: ["post-feed"],
        predicate(query) {
          return (
            query.queryKey.includes("for-you") ||
            (query.queryKey.includes("user-posts") &&
              query.queryKey.includes(user.id))
          );
        },
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });

      toast.success("Comment created");
    },
    onError: (error) => {
      console.error("Error submitting post:", error);
      toast.error(
        "An error occurred while submitting the post. Please try again.",
      );
    },
  });

  return mutation;
};
