"use client";

import { useEffect, useMemo } from "react";

import { AIChatPlugin, AIPlugin } from "@udecode/plate-ai/react";
import {
  getAncestorNode,
  getEndPoint,
  getNodeString,
} from "@udecode/plate-common";
import {
  type PlateEditor,
  focusEditor,
  useEditorPlugin,
} from "@udecode/plate-common/react";
import { useIsSelecting } from "@udecode/plate-selection/react";
import {
  Album,
  BadgeHelp,
  Check,
  CornerUpLeft,
  FeatherIcon,
  ListEnd,
  ListMinus,
  ListPlus,
  PenLine,
  Wand,
  X,
} from "lucide-react";

import { CommandGroup, CommandItem } from "./command";

export type EditorChatState =
  | "cursorCommand"
  | "cursorSuggestion"
  | "selectionCommand"
  | "selectionSuggestion";

export const aiChatItems = {
  accept: {
    icon: <Check />,
    label: "Accepter",
    value: "accept",
    onSelect: ({ editor }) => {
      editor.getTransforms(AIChatPlugin).aiChat.accept();
      focusEditor(editor, getEndPoint(editor, editor.selection!));
    },
  },
  continueWrite: {
    icon: <PenLine />,
    label: "Continuer à écrire",
    value: "continueWrite",
    onSelect: ({ editor }) => {
      const ancestorNode = getAncestorNode(editor);

      if (!ancestorNode) return;

      const isEmpty = getNodeString(ancestorNode[0]).trim().length === 0;

      void editor.getApi(AIChatPlugin).aiChat.submit({
        mode: "insert",
        prompt: isEmpty
          ? `<Document>
{editor}
</Document>
Commencez à écrire un nouveau paragraphe APRÈS <Document> UNE SEULE PHRASE`
          : "Continuez à écrire APRÈS <Block> UNE SEULE PHRASE. NE RÉPÉTEZ PAS LE TEXTE.",
      });
    },
  },
  discard: {
    icon: <X />,
    label: "Annuler",
    shortcut: "Escape",
    value: "discard",
    onSelect: ({ editor }) => {
      editor.getTransforms(AIPlugin).ai.undo();
      editor.getApi(AIChatPlugin).aiChat.hide();
    },
  },
  explain: {
    icon: <BadgeHelp />,
    label: "Expliquer",
    value: "explain",
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: {
          default: "Expliquez {editor}",
          selecting: "Expliquer",
        },
      });
    },
  },
  fixSpelling: {
    icon: <Check />,
    label: "Corriger l'orthographe et la grammaire",
    value: "fixSpelling",
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: "Corrigez l'orthographe et la grammaire",
      });
    },
  },
  improveWriting: {
    icon: <Wand />,
    label: "Améliorer l'écriture",
    value: "improveWriting",
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: "Améliorez l'écriture",
      });
    },
  },
  insertBelow: {
    icon: <ListEnd />,
    label: "Insérer en dessous",
    value: "insertBelow",
    onSelect: ({ aiEditor, editor }) => {
      void editor.getTransforms(AIChatPlugin).aiChat.insertBelow(aiEditor);
    },
  },
  makeLonger: {
    icon: <ListPlus />,
    label: "Allonger",
    value: "makeLonger",
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: "Allongez",
      });
    },
  },
  makeShorter: {
    icon: <ListMinus />,
    label: "Raccourcir",
    value: "makeShorter",
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: "Raccourcissez",
      });
    },
  },
  replace: {
    icon: <Check />,
    label: "Remplacer la sélection",
    value: "replace",
    onSelect: ({ aiEditor, editor }) => {
      void editor.getTransforms(AIChatPlugin).aiChat.replaceSelection(aiEditor);
    },
  },
  simplifyLanguage: {
    icon: <FeatherIcon />,
    label: "Simplifier le langage",
    value: "simplifyLanguage",
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: "Simplifiez le langage",
      });
    },
  },
  summarize: {
    icon: <Album />,
    label: "Ajouter un résumé",
    value: "summarize",
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        mode: "insert",
        prompt: {
          default: "Résumez {editor}",
          selecting: "Résumer",
        },
      });
    },
  },
  tryAgain: {
    icon: <CornerUpLeft />,
    label: "Réessayer",
    value: "tryAgain",
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.reload();
    },
  },
} satisfies Record<
  string,
  {
    icon: React.ReactNode;
    label: string;
    value: string;
    component?: React.ComponentType<{ menuState: EditorChatState }>;
    filterItems?: boolean;
    items?: { label: string; value: string }[];
    shortcut?: string;
    onSelect?: ({
      aiEditor,
      editor,
    }: {
      aiEditor: PlateEditor;
      editor: PlateEditor;
    }) => void;
  }
>;

const menuStateItems: Record<
  EditorChatState,
  {
    items: (typeof aiChatItems)[keyof typeof aiChatItems][];
    heading?: string;
  }[]
> = {
  cursorCommand: [
    {
      items: [
        aiChatItems.continueWrite,
        aiChatItems.summarize,
        aiChatItems.explain,
      ],
    },
  ],
  cursorSuggestion: [
    {
      items: [aiChatItems.accept, aiChatItems.discard, aiChatItems.tryAgain],
    },
  ],
  selectionCommand: [
    {
      items: [
        aiChatItems.improveWriting,
        aiChatItems.makeLonger,
        aiChatItems.makeShorter,
        aiChatItems.fixSpelling,
        aiChatItems.simplifyLanguage,
      ],
    },
  ],
  selectionSuggestion: [
    {
      items: [
        aiChatItems.replace,
        aiChatItems.insertBelow,
        aiChatItems.discard,
        aiChatItems.tryAgain,
      ],
    },
  ],
};

export const AIMenuItems = ({
  aiEditorRef,
  setValue,
}: {
  aiEditorRef: React.MutableRefObject<PlateEditor | null>;
  setValue: (value: string) => void;
}) => {
  const { editor, useOption } = useEditorPlugin(AIChatPlugin);
  const { messages } = useOption("chat");
  const isSelecting = useIsSelecting();

  const menuState = useMemo(() => {
    if (messages && messages.length > 0) {
      return isSelecting ? "selectionSuggestion" : "cursorSuggestion";
    }

    return isSelecting ? "selectionCommand" : "cursorCommand";
  }, [isSelecting, messages]);

  const menuGroups = useMemo(() => {
    const items = menuStateItems[menuState];

    return items;
  }, [menuState]);

  useEffect(() => {
    if (menuGroups.length > 0 && menuGroups[0].items.length > 0) {
      setValue(menuGroups[0].items[0].value);
    }
  }, [menuGroups, setValue]);

  return (
    <>
      {menuGroups.map((group, index) => (
        <CommandGroup key={index} heading={group.heading}>
          {group.items.map((menuItem) => (
            <CommandItem
              key={menuItem.value}
              className="[&_svg]:text-muted-foreground"
              value={menuItem.value}
              onSelect={() => {
                menuItem.onSelect?.({
                  aiEditor: aiEditorRef.current!,
                  editor: editor,
                });
              }}
            >
              {menuItem.icon}
              <span>{menuItem.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      ))}
    </>
  );
};
