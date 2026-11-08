import { X } from "lucide-react";
import { ChannelList } from "stream-chat-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useSession } from "./SessionProvider";

interface ChatSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const ChatSidebar = ({ open, onClose }: ChatSidebarProps) => {
  const { user } = useSession();

  return (
    <div
      className={cn(
        "size-full flex-col border-e md:flex md:w-72",
        open ? "flex" : "hidden",
      )}
    >
      <MenuHeader onClose={onClose} />
      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [user.id] },
        }}
        showChannelSearch
        options={{ state: true, presence: true, limit: 8 }}
        sort={{ last_message_at: -1 }}
        // @ts-expect-error - This is intentional
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: { members: { $in: [user.id] } },
            },
          },
        }}
      />
    </div>
  );
};

interface MenuHeaderProps {
  onClose: () => void;
}

const MenuHeader = ({ onClose }: MenuHeaderProps) => {
  return (
    <div className="flex items-center gap-3 p-2">
      <div className="h-full md:hidden">
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X className="size-5" />
        </Button>
      </div>
    </div>
  );
};
