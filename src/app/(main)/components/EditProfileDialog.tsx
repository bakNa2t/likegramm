import { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/LoadingButton";

import { UserData } from "@/lib/types";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validations";
import { useUpdateProfileMutation } from "../users/[username]/mutaions";
import { Label } from "@/components/ui/label";

interface AvatarInputProps {
  src: string | StaticImageData;
  onImageCropped: (blob: Blob | null) => void;
}

const AvatarInput = ({ src, onImageCropped }: AvatarInputProps) => {
  const [imageToCrop, setImageToCrop] = useState<File>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onImageSelected = (image: File | undefined) => {
    if (!image) return;

    return (
      <>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onImageSelected(e.target.files?.[0])}
          ref={fileInputRef}
          className="sr-only hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="group relative block"
        >
          <Image
            src={src}
            alt="Avatar preview"
            width={150}
            height={150}
            className="size-32 flex-none rounded-full object-cover"
          />
        </button>
      </>
    );
  };
};

interface EditProfileDialogProps {
  user: UserData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditProfileDialog = ({
  user,
  open,
  onOpenChange,
}: EditProfileDialogProps) => {
  const form = useForm<UpdateUserProfileValues>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      displayName: user.displayName,
      bio: user.bio || "",
    },
  });

  const mutation = useUpdateProfileMutation();

  const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);

  const onSubmit = async (values: UpdateUserProfileValues) => {
    mutation.mutate(
      {
        values,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-1.5">
          <Label>Avatar</Label>
          <AvatarInput
            src={
              croppedAvatar
                ? URL.createObjectURL(croppedAvatar)
                : user.avatarUrl
            }
            onImageCropped={setCroppedAvatar}
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your display name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <LoadingButton type="submit" isLoading={mutation.isPending}>
                Save
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
