import Link from "next/link";
import { validateRequest } from "@/auth";
import { Bookmark, Home, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NotificationButton } from "./NotificationButton";

import prisma from "@/lib/prisma";

interface MenuBarProps {
  className?: string;
}

export const MenuBar = async ({ className }: MenuBarProps) => {
  const { user } = await validateRequest();

  if (!user) return null;

  const unreadNotificationsCount = prisma.notification.count({
    where: {
      recipientId: user.id,
      read: false,
    },
  });

  return (
    <div className={className}>
      <Button
        asChild
        title="Home"
        variant="ghost"
        className="flex items-center justify-start gap-3"
      >
        <Link href="/">
          <Home />
          <span className="text-lg font-semibold hidden lg:inline">Home</span>
        </Link>
      </Button>

      <NotificationButton
        initialState={{ unreadCount: unreadNotificationsCount }}
      />

      <Button
        asChild
        title="Messages"
        variant="ghost"
        className="flex items-center justify-start gap-3"
      >
        <Link href="/messages">
          <Mail />
          <span className="text-lg font-semibold hidden lg:inline">
            Messages
          </span>
        </Link>
      </Button>

      <Button
        asChild
        title="Bookmarks"
        variant="ghost"
        className="flex items-center justify-start gap-3"
      >
        <Link href="/bookmarks">
          <Bookmark />
          <span className="text-lg font-semibold hidden lg:inline">
            Bookmarks
          </span>
        </Link>
      </Button>
    </div>
  );
};
