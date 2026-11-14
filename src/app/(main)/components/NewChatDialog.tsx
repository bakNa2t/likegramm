import { useState } from "react";
import { UserResponse } from "stream-chat";
import { useQuery } from "@tanstack/react-query";
import { Check, SearchIcon } from "lucide-react";
// @ts-expect-error - This is intentional
import { DefaultStreamChatGenerics, useChatContext } from "stream-chat-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserAvatar } from "@/components/UserAvatar";

import useDebounce from "@/hooks/useDebounce";
import { useSession } from "./SessionProvider";

interface NewChatDialogProps {
  onOpenChange: (open: boolean) => void;
  onChatCreated: () => void;
}

export const NewChatDialog = ({
  onOpenChange,
  onChatCreated,
}: NewChatDialogProps) => {
  const { client, setActiveChannel } = useChatContext();

  const { user: loggedInUser } = useSession();

  const [searchInput, setSearchInput] = useState("");
  const searchInputDebounced = useDebounce(searchInput);

  const [selectedUsers, setSelectedUsers] = useState<
    // @ts-expect-error - This is intentional
    UserResponse<DefaultStreamChatGenerics>[]
  >([]);

  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ["stream-users", searchInputDebounced],
    queryFn: async () =>
      client.queryUsers(
        {
          // @ts-expect-error - This is intentional
          id: { $ne: loggedInUser.id },
          // @ts-expect-error - This is intentional
          role: { $ne: "admin" },
          ...(searchInputDebounced
            ? {
                $or: [
                  { name: { $autocomplete: searchInputDebounced } },
                  { username: { $autocomplete: searchInputDebounced } },
                ],
              }
            : {}),
        },
        { name: 1, username: 1 },
        { limit: 15 },
      ),
  });

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="bg-card p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>New Chat</DialogTitle>
        </DialogHeader>
        <div>
          <div className="group relative">
            <SearchIcon className="absolute left-5 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground group-focus-within:text-primary" />
            <input
              placeholder="Search users..."
              className="h-12 w-full pe-4 ps-14 focus:outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <div className="h-96 overflow-y-auto">
            {isSuccess &&
              data.users.map((user) => (
                <UserResult
                  key={user.id}
                  user={user}
                  selected={selectedUsers.some((u) => u.id === user.id)}
                  onClick={() => {
                    setSelectedUsers((prev) =>
                      prev.some((u) => u.id === user.id)
                        ? prev.filter((u) => u.id !== user.id)
                        : [...prev, user],
                    );
                  }}
                />
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface UserResultProps {
  // @ts-expect-error - This is intentional
  user: UserResponse<DefaultStreamChatGenerics>;
  selected: boolean;
  onClick: () => void;
}

const UserResult = ({ user, selected, onClick }: UserResultProps) => {
  return (
    <button
      className="flex w-full items-center justify-between px-4 py-2.5 transition-colors hover:bg-muted"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <UserAvatar avatarUrl={user.image} />
        <div className="flex flex-col text-start">
          <p className="font-bold">{user.name}</p>
          <p className="text-muted-foreground">@{user.username}</p>
        </div>
      </div>
      {selected && <Check className="size-5 text-green-500" />}
    </button>
  );
};
