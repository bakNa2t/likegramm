// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Post as PostData } from "@prisma/client";

interface PostProps {
  post: PostData;
}

export const Post = ({ post }: PostProps) => {
  return <article>{post.content}</article>;
};
