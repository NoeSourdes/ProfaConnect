"use client";

import React from "react";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { CodeBlockPlugin } from "@udecode/plate-code-block/react";
import {
  type PlateEditor,
  ParagraphPlugin,
  focusEditor,
  useEditorRef,
} from "@udecode/plate-common/react";
import { DatePlugin } from "@udecode/plate-date/react";
import { ExcalidrawPlugin } from "@udecode/plate-excalidraw/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { TocPlugin } from "@udecode/plate-heading/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { INDENT_LIST_KEYS, ListStyleType } from "@udecode/plate-indent-list";
import { LinkPlugin } from "@udecode/plate-link/react";
import { ImagePlugin, MediaEmbedPlugin } from "@udecode/plate-media/react";
import { TablePlugin } from "@udecode/plate-table/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import {
  CalendarIcon,
  ChevronRightIcon,
  Columns3Icon,
  FileCodeIcon,
  FilmIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PenToolIcon,
  PilcrowIcon,
  PlusIcon,
  QuoteIcon,
  SquareIcon,
  TableIcon,
  TableOfContentsIcon,
} from "lucide-react";

import {
  insertBlock,
  insertInlineElement,
} from "@/src/components/editor/transforms";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

type Group = {
  group: string;
  items: Item[];
};

interface Item {
  icon: React.ReactNode;
  onSelect: (editor: PlateEditor, value: string) => void;
  value: string;
  focusEditor?: boolean;
  label?: string;
}

const groups: Group[] = [
  {
    group: "Blocs de base",
    items: [
      {
        icon: <PilcrowIcon />,
        label: "Paragraphe",
        value: ParagraphPlugin.key,
      },
      {
        icon: <Heading1Icon />,
        label: "Titre 1",
        value: HEADING_KEYS.h1,
      },
      {
        icon: <Heading2Icon />,
        label: "Titre 2",
        value: HEADING_KEYS.h2,
      },
      {
        icon: <Heading3Icon />,
        label: "Titre 3",
        value: HEADING_KEYS.h3,
      },
      {
        icon: <TableIcon />,
        label: "Tableau",
        value: TablePlugin.key,
      },
      {
        icon: <FileCodeIcon />,
        label: "Code",
        value: CodeBlockPlugin.key,
      },
      {
        icon: <QuoteIcon />,
        label: "Citation",
        value: BlockquotePlugin.key,
      },
      {
        icon: <MinusIcon />,
        label: "Séparateur",
        value: HorizontalRulePlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: "Listes",
    items: [
      {
        icon: <ListIcon />,
        label: "Liste à puces",
        value: ListStyleType.Disc,
      },
      {
        icon: <ListOrderedIcon />,
        label: "Liste numérotée",
        value: ListStyleType.Decimal,
      },
      {
        icon: <SquareIcon />,
        label: "Liste de tâches",
        value: INDENT_LIST_KEYS.todo,
      },
      {
        icon: <ChevronRightIcon />,
        label: "Liste déroulante",
        value: TogglePlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: "Médias",
    items: [
      {
        icon: <ImageIcon />,
        label: "Image",
        value: ImagePlugin.key,
      },
      {
        icon: <FilmIcon />,
        label: "Intégrer",
        value: MediaEmbedPlugin.key,
      },
      {
        icon: <PenToolIcon />,
        label: "Excalidraw",
        value: ExcalidrawPlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: "Blocs avancés",
    items: [
      {
        icon: <TableOfContentsIcon />,
        label: "Table des matières",
        value: TocPlugin.key,
      },
      {
        icon: <Columns3Icon />,
        label: "3 colonnes",
        value: "action_three_columns",
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: "En ligne",
    items: [
      {
        icon: <Link2Icon />,
        label: "Lien",
        value: LinkPlugin.key,
      },
      {
        focusEditor: true,
        icon: <CalendarIcon />,
        label: "Date",
        value: DatePlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertInlineElement(editor, value);
      },
    })),
  },
];

export function InsertDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Insérer" isDropdown>
          <PlusIcon />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="flex max-h-[500px] min-w-0 flex-col overflow-y-auto"
        align="start"
      >
        {groups.map(({ group, items: nestedItems }) => (
          <DropdownMenuGroup key={group} label={group}>
            {nestedItems.map(({ icon, label, value, onSelect }) => (
              <DropdownMenuItem
                key={value}
                className="min-w-[180px]"
                onSelect={() => {
                  onSelect(editor, value);
                  focusEditor(editor);
                }}
              >
                {icon}
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
