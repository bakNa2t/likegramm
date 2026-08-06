import { Suspense } from "react";
import { Loader2 } from "lucide-react";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { userDataSelect } from "@/lib/types";

export const ToFollow = async () => {
  const { user } = await validateRequest();

  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
    },
    select: userDataSelect(user.id),
    take: 5,
  });

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Who to follow</div>
    </div>
  );
};

export const TrendsSidebar = () => {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <ToFollow />
      </Suspense>
    </div>
  );
};
