import prisma from "@/lib/prisma";

import { Post } from "@/components/posts/Post";
import { PostEditor } from "@/components/posts/editor/PostEditor";

const Home = async () => {
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PostEditor />

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
};

export default Home;
