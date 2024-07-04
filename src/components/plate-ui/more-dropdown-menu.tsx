import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import { MARK_SUBSCRIPT, MARK_SUPERSCRIPT } from "@udecode/plate-basic-marks";
import {
  collapseSelection,
  focusEditor,
  toggleMark,
  useEditorRef,
} from "@udecode/plate-common";
import { MARK_HIGHLIGHT } from "@udecode/plate-highlight";
import { MARK_KBD } from "@udecode/plate-kbd";

import { Icons } from "@/src/components/icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

export function MoreDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Insérer">
          <Icons.more />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="z-[4007] flex max-h-[500px] min-w-[180px] flex-col gap-0.5 overflow-y-auto"
      >
        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              key: MARK_HIGHLIGHT,
            });
            collapseSelection(editor, { edge: "end" });
            focusEditor(editor);
          }}
        >
          <Icons.highlight className="mr-2 size-5" />
          Surligner
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              key: MARK_KBD,
            });
            collapseSelection(editor, { edge: "end" });
            focusEditor(editor);
          }}
        >
          <Icons.kbd className="mr-2 size-5" />
          Entrée clavier
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              clear: MARK_SUBSCRIPT,
              key: MARK_SUPERSCRIPT,
            });
            focusEditor(editor);
          }}
        >
          <Icons.superscript className="mr-2 size-5" />
          Exposant
          {/* (⌘+,) */}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              clear: MARK_SUPERSCRIPT,
              key: MARK_SUBSCRIPT,
            });
            focusEditor(editor);
          }}
        >
          <Icons.subscript className="mr-2 size-5" />
          Indice
          {/* (⌘+.) */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
