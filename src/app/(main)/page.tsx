import prisma from "@/lib/prisma";

import { Post } from "@/components/posts/Post";
import { PostEditor } from "@/components/posts/editor/PostEditor";

import { PostData, postDataInclude } from "@/lib/types";

const Home = async () => {
  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />

        {posts.map((post: PostData) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default Home;
