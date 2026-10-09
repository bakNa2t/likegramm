"use server";

import { validateRequest } from "@/auth";

import prisma from "@/lib/prisma";
import { createCommentSchema } from "@/lib/validations";
import { getCommentDataInclude, PostData } from "@/lib/types";

export const submitComment = async ({
  post,
  content,
}: {
  post: PostData;
  content: string;
}) => {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content: contentValidated } = createCommentSchema.parse({ content });

  const newComment = await prisma.comment.create({
    data: {
      content: contentValidated,
      postId: post.id,
      userId: user.id,
    },
    include: getCommentDataInclude(user.id),
  });

  return newComment;
};
