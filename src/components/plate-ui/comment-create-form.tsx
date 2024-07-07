"use client";

import { cn } from "@udecode/cn";
import {
  CommentNewSubmitButton,
  CommentNewTextarea,
  useCommentsSelectors,
} from "@udecode/plate-comments";

import { useSession } from "next-auth/react";
import { buttonVariants } from "./button";
import { CommentAvatar } from "./comment-avatar";
import { inputVariants } from "./input";

export function CommentCreateForm() {
  const myUserId = useCommentsSelectors().myUserId();

  return (
    <div className="flex w-full space-x-2">
      <CommentAvatar userId={myUserId} />
      <div className="flex grow flex-col items-end gap-2">
        <CommentNewTextarea
          className={inputVariants()}
          placeholder="Ajouter un commentaire..."
        />

        <CommentNewSubmitButton
          className={cn(buttonVariants({ size: "sm" }), "w-[90px]")}
        >
          Commenter
        </CommentNewSubmitButton>
      </div>
    </div>
  );
}
