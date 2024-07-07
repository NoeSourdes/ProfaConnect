"use client";

import { cn } from "@udecode/cn";
import {
  useCommentDeleteButton,
  useCommentDeleteButtonState,
  useCommentEditButton,
  useCommentEditButtonState,
} from "@udecode/plate-comments";

import { Icons } from "@/src/components/icons";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export function CommentMoreDropdown() {
  const editButtonState = useCommentEditButtonState();
  const { props: editProps } = useCommentEditButton(editButtonState);
  const deleteButtonState = useCommentDeleteButtonState();
  const { props: deleteProps } = useCommentDeleteButton(deleteButtonState);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className={cn("h-6 p-1 text-muted-foreground")} variant="ghost">
          <Icons.more className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem {...editProps}>
          Modifier le commentaire
        </DropdownMenuItem>
        <DropdownMenuItem {...deleteProps}>
          Supprimer le commentaire
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
