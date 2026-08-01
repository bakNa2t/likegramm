"use server";

import { validateRequest } from "@/auth";

import prisma from "@/lib/prisma";
import { createPostSchema } from "@/lib/validations";

export const submitPost = async (input: string) => {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content } = createPostSchema.parse(input);

  const newPost = await prisma.post.create({
    content,
    userId: user.id,
  });

  return newPost;
};
