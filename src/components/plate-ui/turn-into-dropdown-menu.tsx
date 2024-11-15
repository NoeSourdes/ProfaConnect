"use client";

import React from "react";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { CodeBlockPlugin } from "@udecode/plate-code-block/react";
import {
  ParagraphPlugin,
  focusEditor,
  useEditorRef,
  useSelectionFragmentProp,
} from "@udecode/plate-common/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { INDENT_LIST_KEYS, ListStyleType } from "@udecode/plate-indent-list";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import {
  ChevronRightIcon,
  Columns3Icon,
  FileCodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  PilcrowIcon,
  QuoteIcon,
  SquareIcon,
} from "lucide-react";

import { getBlockType, setBlockType } from "@/src/components/editor/transforms";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

const turnIntoItems = [
  {
    icon: <PilcrowIcon />,
    keywords: ["paragraphe"],
    label: "Texte",
    value: ParagraphPlugin.key,
  },
  {
    icon: <Heading1Icon />,
    keywords: ["titre", "h1"],
    label: "Titre 1",
    value: HEADING_KEYS.h1,
  },
  {
    icon: <Heading2Icon />,
    keywords: ["sous-titre", "h2"],
    label: "Titre 2",
    value: HEADING_KEYS.h2,
  },
  {
    icon: <Heading3Icon />,
    keywords: ["sous-titre", "h3"],
    label: "Titre 3",
    value: HEADING_KEYS.h3,
  },
  {
    icon: <ListIcon />,
    keywords: ["non ordonnée", "ul", "-"],
    label: "Liste à puces",
    value: ListStyleType.Disc,
  },
  {
    icon: <ListOrderedIcon />,
    keywords: ["ordonnée", "ol", "1"],
    label: "Liste numérotée",
    value: ListStyleType.Decimal,
  },
  {
    icon: <SquareIcon />,
    keywords: ["liste de tâches", "tâche", "checkbox", "[]"],
    label: "Liste de tâches",
    value: INDENT_LIST_KEYS.todo,
  },
  {
    icon: <ChevronRightIcon />,
    keywords: ["repliable", "extensible"],
    label: "Liste déroulante",
    value: TogglePlugin.key,
  },
  {
    icon: <FileCodeIcon />,
    keywords: ["```"],
    label: "Code",
    value: CodeBlockPlugin.key,
  },
  {
    icon: <QuoteIcon />,
    keywords: ["citation", "blockquote", ">"],
    label: "Citation",
    value: BlockquotePlugin.key,
  },
  {
    icon: <Columns3Icon />,
    label: "3 colonnes",
    value: "action_three_columns",
  },
];

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  const value = useSelectionFragmentProp({
    defaultValue: ParagraphPlugin.key,
    getProp: (node) => getBlockType(node as any),
  });
  const selectedItem = React.useMemo(
    () =>
      turnIntoItems.find(
        (item) => item.value === (value ?? ParagraphPlugin.key)
      ) ?? turnIntoItems[0],
    [value]
  );

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="Transformer en"
          isDropdown
        >
          {selectedItem.label}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="ignore-click-outside/toolbar min-w-0"
        align="start"
      >
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(type) => {
            setBlockType(editor, type);
            focusEditor(editor);
          }}
          label="Transformer en"
        >
          {turnIntoItems.map(({ icon, label, value: itemValue }) => (
            <DropdownMenuRadioItem
              key={itemValue}
              className="min-w-[180px]"
              value={itemValue}
            >
              {icon}
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
