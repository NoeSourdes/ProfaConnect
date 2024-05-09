"use client";

import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ToolBare } from "./ToolBare";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Document,
      Paragraph,
      Text,
    ],
    editorProps: {
      attributes: {
        class: "rounded-lg h-full w-full p-4 focus:outline-none",
      },
    },
  });

  return (
    <>
      <ToolBare editor={editor}></ToolBare>
      <EditorContent className="h-full w-full" editor={editor}></EditorContent>
    </>
  );
};

export default Tiptap;
