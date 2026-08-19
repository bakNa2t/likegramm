import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { LoadingButton } from "../LoadingButton";

import { PostData } from "@/lib/types";
import { useDeletePostMutation } from "./mutations";

interface DeletePostDiologProps {
  isOpen: boolean;
  post: PostData;
  onClose: () => void;
}

export const DeletePostDiolog = ({
  isOpen,
  post,
  onClose,
}: DeletePostDiologProps) => {
  const mutation = useDeletePostMutation();

  const handleOpenChange = (open: boolean) => {
    if (!open || !mutation.isPending) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the post.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <LoadingButton
            isLoading={mutation.isPending}
            variant="destructive"
            onClick={() => mutation.mutate(post.id, { onSuccess: onClose })}
          >
            Delete
          </LoadingButton>

          <Button
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
