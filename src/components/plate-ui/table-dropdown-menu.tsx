"use client";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import { someNode } from "@udecode/plate-common";
import {
  focusEditor,
  useEditorPlugin,
  useEditorSelector,
} from "@udecode/plate-common/react";
import { deleteTable, insertTableRow } from "@udecode/plate-table";
import {
  TablePlugin,
  deleteColumn,
  deleteRow,
  insertTable,
} from "@udecode/plate-table/react";
import {
  Minus,
  Plus,
  RectangleHorizontal,
  RectangleVertical,
  Table,
  Trash,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

export function TableDropdownMenu(props: DropdownMenuProps) {
  const tableSelected = useEditorSelector(
    (editor) => someNode(editor, { match: { type: TablePlugin.key } }),
    []
  );

  const { editor, tf } = useEditorPlugin(TablePlugin);

  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Tableau" isDropdown>
          <Table />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="flex w-[180px] min-w-0 flex-col"
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Table />
              <span>Tableau</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className="min-w-[180px]"
                onSelect={() => {
                  insertTable(editor, {}, { select: true });
                  focusEditor(editor);
                }}
              >
                <Plus />
                Insérer une table
              </DropdownMenuItem>
              <DropdownMenuItem
                className="min-w-[180px]"
                disabled={!tableSelected}
                onSelect={() => {
                  deleteTable(editor);
                  focusEditor(editor);
                }}
              >
                <Trash />
                Supprimer la table
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger disabled={!tableSelected}>
              <RectangleVertical />
              <span>Colonne</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className="min-w-[180px]"
                disabled={!tableSelected}
                onSelect={() => {
                  tf.insert.tableColumn();
                  focusEditor(editor);
                }}
              >
                <Plus />
                Insérer une colonne après
              </DropdownMenuItem>
              <DropdownMenuItem
                className="min-w-[180px]"
                disabled={!tableSelected}
                onSelect={() => {
                  deleteColumn(editor);
                  focusEditor(editor);
                }}
              >
                <Minus />
                Supprimer la colonne
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger disabled={!tableSelected}>
              <RectangleHorizontal />
              <span>Ligne</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className="min-w-[180px]"
                disabled={!tableSelected}
                onSelect={() => {
                  insertTableRow(editor);
                  focusEditor(editor);
                }}
              >
                <Plus />
                Insérer une ligne après
              </DropdownMenuItem>
              <DropdownMenuItem
                className="min-w-[180px]"
                disabled={!tableSelected}
                onSelect={() => {
                  deleteRow(editor);
                  focusEditor(editor);
                }}
              >
                <Minus />
                Supprimer la ligne
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
