import { PostEditor } from "@/components/posts/editor/PostEditor";

import { ForYouFeed } from "./components/ForYouFeed";
import { TrendsSidebar } from "@/components/TrendsSidebar";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>

      <TrendsSidebar />
    </main>
  );
};

export default Home;
