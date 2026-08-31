import { PostEditor } from "@/components/posts/editor/PostEditor";

import { ForYouFeed } from "./components/ForYouFeed";
import { TrendsSidebar } from "@/components/TrendsSidebar";
import { FollowingFeed } from "./components/FollowingFedd";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />

        <Tabs defaultValue="for-you">
          <TabsList>
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </div>

      <TrendsSidebar />
    </main>
  );
};

export default Home;
