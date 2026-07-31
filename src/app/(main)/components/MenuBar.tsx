import Link from "next/link";
import { Bell, Bookmark, Home, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

interface MenuBarProps {
  className?: string;
}

export const MenuBar = ({ className }: MenuBarProps) => {
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

      <Button
        asChild
        title="Notifications"
        variant="ghost"
        className="flex items-center justify-start gap-3"
      >
        <Link href="/notifications">
          <Bell />
          <span className="text-lg font-semibold hidden lg:inline">
            Notifications
          </span>
        </Link>
      </Button>

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
