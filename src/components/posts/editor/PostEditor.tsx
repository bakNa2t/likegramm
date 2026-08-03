"use client";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/UserAvatar";

import { cn } from "@/lib/utils";
import { submitPost } from "./actions";
import { useSession } from "@/app/(main)/components/SessionProvider";

import "./styles.css";

export const PostEditor = () => {
  const { user } = useSession();

  const isDragActive = false;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's crack-a-lackin'?",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  const onSubmit = async () => {
    await submitPost(input);
    editor?.commands.clearContent();
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className={cn(
            "max-h-80 w-full overflow-y-auto rounded-2xl bg-background px-5 py-3",
            isDragActive && "outline-dashed",
          )}
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onSubmit}
          disabled={!input.trim()}
          className="min-w-20"
        >
          Post
        </Button>
      </div>
    </div>
  );
};
