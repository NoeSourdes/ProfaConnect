import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { useEditorReadOnly } from "@udecode/plate-common";

import { Icons, iconVariants } from "@/src/components/icons";

import { MARK_BG_COLOR, MARK_COLOR } from "@udecode/plate-font";
import { ListStyleType } from "@udecode/plate-indent-list";
import { ELEMENT_IMAGE } from "@udecode/plate-media";
import { Maximize, Minimize } from "lucide-react";
import { AlignDropdownMenu } from "./align-dropdown-menu";
import { ColorDropdownMenu } from "./color-dropdown-menu";
import { CommentToolbarButton } from "./comment-toolbar-button";
import { EmojiDropdownMenu } from "./emoji-dropdown-menu";
import { IndentListToolbarButton } from "./indent-list-toolbar-button";
import { IndentToolbarButton } from "./indent-toolbar-button";
import { InsertDropdownMenu } from "./insert-dropdown-menu";
import { LineHeightDropdownMenu } from "./line-height-dropdown-menu";
import { LinkToolbarButton } from "./link-toolbar-button";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { MediaToolbarButton } from "./media-toolbar-button";
import { MoreDropdownMenu } from "./more-dropdown-menu";
import { OutdentToolbarButton } from "./outdent-toolbar-button";
import { TableDropdownMenu } from "./table-dropdown-menu";
import { ToolbarButton, ToolbarGroup } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

interface FixedToolbarButtonsProps {
  handleFullScreen: () => void;
  isFullScreen: boolean;
}

export function FixedToolbarButtons(props: FixedToolbarButtonsProps) {
  const readOnly = useEditorReadOnly();

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex flex-wrap"
        style={{
          transform: "translateX(calc(-1px))",
        }}
      >
        {!readOnly && (
          <>
            <ToolbarGroup noSeparator>
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton nodeType={MARK_BOLD} tooltip="Gras (⌘+B)">
                <Icons.bold />
              </MarkToolbarButton>
              <MarkToolbarButton
                nodeType={MARK_ITALIC}
                tooltip="Italique (⌘+I)"
              >
                <Icons.italic />
              </MarkToolbarButton>
              <MarkToolbarButton
                nodeType={MARK_UNDERLINE}
                tooltip="Souligner (⌘+U)"
              >
                <Icons.underline />
              </MarkToolbarButton>
              <ColorDropdownMenu
                nodeType={MARK_COLOR}
                tooltip="Couleur du texte"
              >
                <Icons.color className={iconVariants({ variant: "toolbar" })} />
              </ColorDropdownMenu>
              <ColorDropdownMenu
                nodeType={MARK_BG_COLOR}
                tooltip="Couleur de surlignage"
              >
                <Icons.bg className={iconVariants({ variant: "toolbar" })} />
              </ColorDropdownMenu>

              <MarkToolbarButton
                nodeType={MARK_STRIKETHROUGH}
                tooltip="Barré (⌘+⇧+M)"
              >
                <Icons.strikethrough />
              </MarkToolbarButton>
              <MarkToolbarButton nodeType={MARK_CODE} tooltip="Code (⌘+E)">
                <Icons.code />
              </MarkToolbarButton>
            </ToolbarGroup>
            <ToolbarGroup>
              <AlignDropdownMenu />

              <LineHeightDropdownMenu />

              <IndentListToolbarButton nodeType={ListStyleType.Disc} />
              <IndentListToolbarButton nodeType={ListStyleType.Decimal} />

              <OutdentToolbarButton />
              <IndentToolbarButton />
            </ToolbarGroup>

            <ToolbarGroup>
              <LinkToolbarButton />

              <MediaToolbarButton nodeType={ELEMENT_IMAGE} />

              <TableDropdownMenu />

              <EmojiDropdownMenu />

              <MoreDropdownMenu />
              <ToolbarButton
                onClick={props.handleFullScreen}
                tooltip={
                  props.isFullScreen ? "Quitter le plein écran" : "Plein écran"
                }
              >
                {props.isFullScreen ? <Minimize /> : <Maximize />}
              </ToolbarButton>
            </ToolbarGroup>
          </>
        )}

        <div className="grow" />

        <ToolbarGroup noSeparator>
          <CommentToolbarButton />
        </ToolbarGroup>
      </div>
    </div>
  );
}
