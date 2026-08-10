import Link from "next/link";

import { UserAvatar } from "../UserAvatar";

import { PostData } from "@/lib/types";
// import { formatRelativeDate } from "@/lib/utils";

interface PostProps {
  post: PostData;
}

export const Post = ({ post }: PostProps) => {
  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <Link href={`/users/${post.user.username}`}>
          <UserAvatar avatarUrl={post.user.avatarUrl} />
        </Link>

        <div>
          <Link
            href={`/users/${post.user.username}`}
            className="block font-medium hover:underline"
          >
            {post.user.displayName}
          </Link>

          <Link
            href={`/posts/${post.id}`}
            className="block text-sm text-muted-foreground hover:underline"
            suppressHydrationWarning
          >
            {/* {formatRelativeDate(post.createdAt)} */}
          </Link>
        </div>
      </div>
      <div className="whitespace-pre-line wrap-break-word">{post.content}</div>
    </article>
  );
};
