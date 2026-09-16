"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { EditProfileDialog } from "./EditProfileDialog";

import { UserData } from "@/lib/types";

interface EditProfileButtonProps {
  user: UserData;
}

export const EditProfileButton = ({ user }: EditProfileButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setShowDialog(true)}>
        Edit Profile
      </Button>
      <EditProfileDialog
        user={user}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
};
