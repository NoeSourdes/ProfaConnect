"use client";

import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { useEditorReadOnly } from "@udecode/plate-common/react";
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
} from "@udecode/plate-font/react";
import { ListStyleType } from "@udecode/plate-indent-list";
import { ImagePlugin } from "@udecode/plate-media/react";
import {
  BaselineIcon,
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  PaintBucketIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";

import Image from "next/image";
import { AIToolbarButton } from "./ai-toolbar-button";
import { AlignDropdownMenu } from "./align-dropdown-menu";
import { ColorDropdownMenu } from "./color-dropdown-menu";
import { CommentToolbarButton } from "./comment-toolbar-button";
import { EmojiDropdownMenu } from "./emoji-dropdown-menu";
import { IndentListToolbarButton } from "./indent-list-toolbar-button";
import { IndentTodoToolbarButton } from "./indent-todo-toolbar-button";
import { IndentToolbarButton } from "./indent-toolbar-button";
import { InsertDropdownMenu } from "./insert-dropdown-menu";
import { LineHeightDropdownMenu } from "./line-height-dropdown-menu";
import { LinkToolbarButton } from "./link-toolbar-button";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { MediaToolbarButton } from "./media-toolbar-button";
import { ModeDropdownMenu } from "./mode-dropdown-menu";
import { MoreDropdownMenu } from "./more-dropdown-menu";
import { OutdentToolbarButton } from "./outdent-toolbar-button";
import { TableDropdownMenu } from "./table-dropdown-menu";
import { ToggleToolbarButton } from "./toggle-toolbar-button";
import { ToolbarGroup } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className="flex w-full">
      {!readOnly && (
        <>
          <ToolbarGroup>
            <AIToolbarButton
              className="bg-[linear-gradient(120deg,#6EB6F2,#6EB6F2,#a855f7,#ea580c,#eab308)] bg-clip-text text-transparent hover:bg-[linear-gradient(120deg,#6EB6F2,#6EB6F2,#a855f7,#ea580c,#eab308)] hover:text-transparent hover:bg-clip-text"
              tooltip="Éditer, générer, et plus"
            >
              <Image
                src="/svg/star.svg"
                alt="logo star ai"
                width={24}
                height={24}
                layout="fixed"
              />
              Demander à l'IA
            </AIToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup>
            <InsertDropdownMenu />
            <TurnIntoDropdownMenu />
          </ToolbarGroup>

          <ToolbarGroup>
            <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Gras (⌘+B)">
              <BoldIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={ItalicPlugin.key}
              tooltip="Italique (⌘+I)"
            >
              <ItalicIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={UnderlinePlugin.key}
              tooltip="Souligné (⌘+U)"
            >
              <UnderlineIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={StrikethroughPlugin.key}
              tooltip="Barré (⌘+⇧+M)"
            >
              <StrikethroughIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={CodePlugin.key} tooltip="Code (⌘+E)">
              <Code2Icon />
            </MarkToolbarButton>

            <ColorDropdownMenu
              nodeType={FontColorPlugin.key}
              tooltip="Couleur du texte"
            >
              <BaselineIcon />
            </ColorDropdownMenu>

            <ColorDropdownMenu
              nodeType={FontBackgroundColorPlugin.key}
              tooltip="Couleur de fond"
            >
              <PaintBucketIcon />
            </ColorDropdownMenu>
          </ToolbarGroup>

          <ToolbarGroup>
            <AlignDropdownMenu />
            <LineHeightDropdownMenu />

            <IndentListToolbarButton nodeType={ListStyleType.Disc} />
            <IndentListToolbarButton nodeType={ListStyleType.Decimal} />
            <IndentTodoToolbarButton />

            <OutdentToolbarButton />
            <IndentToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup>
            <LinkToolbarButton />
            <ToggleToolbarButton />
            <MediaToolbarButton nodeType={ImagePlugin.key} />
            <TableDropdownMenu />
            <EmojiDropdownMenu />
            <MoreDropdownMenu />
          </ToolbarGroup>
        </>
      )}

      <div className="grow" />

      <ToolbarGroup>
        <CommentToolbarButton />
        <ModeDropdownMenu />
      </ToolbarGroup>
    </div>
  );
}
