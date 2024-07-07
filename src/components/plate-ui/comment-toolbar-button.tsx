"use client";

import { useCommentAddButton } from "@udecode/plate-comments";

import { Icons } from "@/src/components/icons";

import { ToolbarButton } from "./toolbar";

export function CommentToolbarButton() {
  const { hidden, props } = useCommentAddButton();

  if (hidden) return null;

  return (
    <ToolbarButton tooltip="Commentaire (⌘+⇧+M)" {...props}>
      <Icons.commentAdd />
    </ToolbarButton>
  );
}
