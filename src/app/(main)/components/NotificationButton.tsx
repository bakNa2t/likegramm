"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import kyInstance from "@/lib/ky";
import { NotificationCountInfo } from "@/lib/types";

interface NotificationButtonProps {
  initialState: NotificationCountInfo;
}

export const NotificationButton = ({
  initialState,
}: NotificationButtonProps) => {
  const { data } = useQuery({
    queryKey: ["unread-notification-count"],
    queryFn: () =>
      kyInstance
        .get("/api/notifications/unread-count")
        .json<NotificationCountInfo>(),
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });

  return (
    <Button
      asChild
      title="Notifications"
      variant="ghost"
      className="flex items-center justify-start gap-3"
    >
      <Link href="/notifications">
        <div className="relative">
          <Bell />
          {!!data.unreadCount && (
            <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1 text-xs font-medium tabular-nums text-primary-foreground">
              {data.unreadCount}
            </span>
          )}
        </div>
        <span className="text-lg font-semibold hidden lg:inline">
          Notifications
        </span>
      </Link>
    </Button>
  );
};
