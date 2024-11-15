"use client";

import React from "react";

import { withRef } from "@udecode/cn";
import { AIChatPlugin } from "@udecode/plate-ai/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { CodeBlockPlugin } from "@udecode/plate-code-block/react";
import { type PlateEditor, ParagraphPlugin } from "@udecode/plate-common/react";
import { DatePlugin } from "@udecode/plate-date/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { TocPlugin } from "@udecode/plate-heading/react";
import { INDENT_LIST_KEYS, ListStyleType } from "@udecode/plate-indent-list";
import { TablePlugin } from "@udecode/plate-table/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import {
  CalendarIcon,
  ChevronRightIcon,
  Code2,
  Columns3Icon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrdered,
  PilcrowIcon,
  Quote,
  SparklesIcon,
  Square,
  Table,
  TableOfContentsIcon,
} from "lucide-react";

import {
  insertBlock,
  insertInlineElement,
} from "@/src/components/editor/transforms";

import Image from "next/image";
import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxGroup,
  InlineComboboxGroupLabel,
  InlineComboboxInput,
  InlineComboboxItem,
} from "./inline-combobox";
import { PlateElement } from "./plate-element";

type Group = {
  group: string;
  items: Item[];
};

interface Item {
  icon: React.ReactNode;

  onSelect: (editor: PlateEditor, value: string) => void;

  value: string;
  className?: string;
  focusEditor?: boolean;
  keywords?: string[];
  label?: string;
  description?: string;
}

const groups: Group[] = [
  {
    group: "IA",
    items: [
      {
        focusEditor: false,
        icon: <SparklesIcon fill="#9334E9" />,
        value: "Demander à l'IA",
        description: "Utliser l'IA pour vous aider à écrire.",
        onSelect: (editor) => {
          editor.getApi(AIChatPlugin).aiChat.show();
        },
      },
    ],
  },
  {
    group: "Blocs de base",
    items: [
      {
        icon: <PilcrowIcon />,
        keywords: ["paragraphe"],
        label: "Texte",
        description: "Insère un paragraphe de texte.",
        value: ParagraphPlugin.key,
      },
      {
        icon: <Heading1Icon />,
        keywords: ["titre", "h1"],
        label: "Titre 1",
        description: "Insère un titre de niveau 1.",
        value: HEADING_KEYS.h1,
      },
      {
        icon: <Heading2Icon />,
        keywords: ["sous-titre", "h2"],
        label: "Titre 2",
        description: "Insère un titre de niveau 2.",
        value: HEADING_KEYS.h2,
      },
      {
        icon: <Heading3Icon />,
        keywords: ["sous-titre", "h3"],
        label: "Titre 3",
        description: "Insère un titre de niveau 3.",
        value: HEADING_KEYS.h3,
      },
      {
        icon: <ListIcon />,
        keywords: ["non ordonné", "ul", "-"],
        label: "Liste à puces",
        description: "Insère une liste à puces.",
        value: ListStyleType.Disc,
      },
      {
        icon: <ListOrdered />,
        keywords: ["ordonné", "ol", "1"],
        label: "Liste numérotée",
        description: "Insère une liste numérotée.",
        value: ListStyleType.Decimal,
      },
      {
        icon: <Square />,
        keywords: ["liste de tâches", "tâche", "checkbox", "[]"],
        label: "Liste de tâches",
        description: "Insère une liste de tâches.",
        value: INDENT_LIST_KEYS.todo,
      },
      {
        icon: <ChevronRightIcon />,
        keywords: ["repliable", "extensible"],
        label: "Basculer",
        description: "Insère un bloc basculant.",
        value: TogglePlugin.key,
      },
      {
        icon: <Code2 />,
        keywords: ["```"],
        label: "Bloc de code",
        description: "Insère un bloc de code.",
        value: CodeBlockPlugin.key,
      },
      {
        icon: <Table />,
        label: "Tableau",
        description: "Insère un tableau.",
        value: TablePlugin.key,
      },
      {
        icon: <Quote />,
        keywords: ["citation", "blockquote", "quote", ">"],
        label: "Citation",
        description: "Insère une citation.",
        value: BlockquotePlugin.key,
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
        keywords: ["table des matières"],
        label: "Table des matières",
        description: "Insère une table des matières.",
        value: TocPlugin.key,
      },
      {
        icon: <Columns3Icon />,
        label: "3 colonnes",
        description: "Insère un bloc de trois colonnes.",
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
        focusEditor: true,
        icon: <CalendarIcon />,
        keywords: ["temps"],
        label: "Date",
        description: "Insère une date.",
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

export const SlashInputElement = withRef<typeof PlateElement>(
  ({ className, ...props }, ref) => {
    const { children, editor, element } = props;

    return (
      <PlateElement
        ref={ref}
        as="span"
        data-slate-value={element.value}
        {...props}
      >
        <InlineCombobox element={element} trigger="/">
          <InlineComboboxInput />

          <InlineComboboxContent className="border">
            <InlineComboboxEmpty className="text-muted-foreground text-sm font-light py-5 ">
              Aucun résultat
            </InlineComboboxEmpty>

            {groups.map(({ group, items }) => (
              <InlineComboboxGroup key={group}>
                <InlineComboboxGroupLabel>{group}</InlineComboboxGroupLabel>

                {items.map(
                  ({
                    focusEditor,
                    icon,
                    keywords,
                    label,
                    value,
                    description,
                    onSelect,
                  }) => (
                    <InlineComboboxItem
                      key={value}
                      value={value}
                      onClick={() => onSelect(editor, value)}
                      label={label}
                      focusEditor={focusEditor}
                      group={group}
                      keywords={keywords}
                    >
                      <div
                        className={`mr-2 text-muted-foreground border p-3 rounded `}
                      >
                        {value === "Demander à l'IA" ? (
                          <Image
                            src="/svg/star.svg"
                            alt="logo star ai"
                            width={24}
                            height={24}
                            layout="fixed"
                          />
                        ) : (
                          icon
                        )}
                      </div>
                      <div className={`flex flex-col`}>
                        <p
                          className={`${
                            value === "Demander à l'IA" &&
                            "bg-[linear-gradient(120deg,#6EB6F2,#a855f7,#ea580c,#eab308,#eab308,#eab308)] bg-clip-text text-transparent font-medium"
                          }`}
                        >
                          {label ?? value}
                        </p>
                        {description && (
                          <div className="text-xs text-muted-foreground">
                            {description}
                          </div>
                        )}
                      </div>
                    </InlineComboboxItem>
                  )
                )}
              </InlineComboboxGroup>
            ))}
          </InlineComboboxContent>
        </InlineCombobox>

        {children}
      </PlateElement>
    );
  }
);
