import React from "react";

import type { ValueId } from "@/src/config/customizer-plugins";

import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { useEditorReadOnly } from "@udecode/plate-common";

import { Icons } from "@/src/components/icons";
import { isEnabled } from "@/src/lib/plate-ui/is-enabled";
import { CommentToolbarButton } from "@/src/registry/default/plate-ui/comment-toolbar-button";
import { LinkToolbarButton } from "@/src/registry/default/plate-ui/link-toolbar-button";
import { MarkToolbarButton } from "@/src/registry/default/plate-ui/mark-toolbar-button";
import { ToolbarSeparator } from "@/src/registry/default/plate-ui/toolbar";

import { PlaygroundMoreDropdownMenu } from "./playground-more-dropdown-menu";
import { PlaygroundTurnIntoDropdownMenu } from "./playground-turn-into-dropdown-menu";

export function PlaygroundFloatingToolbarButtons({ id }: { id?: ValueId }) {
  const readOnly = useEditorReadOnly();

  return (
    <>
      {!readOnly && (
        <>
          <PlaygroundTurnIntoDropdownMenu />

          <MarkToolbarButton nodeType={MARK_BOLD} tooltip="Bold (⌘+B)">
            <Icons.bold />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={MARK_ITALIC} tooltip="Italic (⌘+I)">
            <Icons.italic />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_UNDERLINE}
            tooltip="Underline (⌘+U)"
          >
            <Icons.underline />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_STRIKETHROUGH}
            tooltip="Strikethrough (⌘+⇧+M)"
          >
            <Icons.strikethrough />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={MARK_CODE} tooltip="Code (⌘+E)">
            <Icons.code />
          </MarkToolbarButton>

          <ToolbarSeparator />

          {isEnabled("link", id) && <LinkToolbarButton />}
        </>
      )}

      {isEnabled("comment", id) && <CommentToolbarButton />}

      <PlaygroundMoreDropdownMenu />
    </>
  );
}
