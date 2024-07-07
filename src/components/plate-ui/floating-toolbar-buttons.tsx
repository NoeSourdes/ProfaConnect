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
import { AlignDropdownMenu } from "./align-dropdown-menu";
import { ColorDropdownMenu } from "./color-dropdown-menu";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { MoreDropdownMenu } from "./more-dropdown-menu";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <>
      {!readOnly && (
        <>
          <TurnIntoDropdownMenu />

          <MarkToolbarButton nodeType={MARK_BOLD} tooltip="Gras (⌘+B)">
            <Icons.bold />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={MARK_ITALIC} tooltip="Italique (⌘+I)">
            <Icons.italic />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_UNDERLINE}
            tooltip="Souligner (⌘+U)"
          >
            <Icons.underline />
          </MarkToolbarButton>
          <ColorDropdownMenu nodeType={MARK_COLOR} tooltip="Couleur du texte">
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
          <AlignDropdownMenu />
        </>
      )}

      <MoreDropdownMenu />
    </>
  );
}
