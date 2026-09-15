"use client";

import { useState } from "react";

import { UserData } from "@/lib/types";
import { Button } from "@/components/ui/button";

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
    </>
  );
};
