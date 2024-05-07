"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { ToolBare } from "./ToolBare";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: `
      <h2>
        Hello World!
      </h2>
    `,
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
