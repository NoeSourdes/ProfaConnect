"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
import ColorPicker from "./ColorPicker";

export type ToolBarProps = {
  editor: any;
};

export const ToolBar = (props: ToolBarProps) => {
  if (!props.editor) {
    return null;
  }
  const handleColorChange = (color: any) => {
    props.editor.chain().focus().setColor(color).run();
  };

  const handleSizeChange = (size: any) => {
    props.editor.chain().focus().toggleHeading({ level: 2 }).run();
  };

  return (
    <div className="border-b p-2">
      <ToggleGroup type="multiple" className="flex justify-start">
        <ToggleGroupItem
          value="bold"
          aria-label="Toggle bold"
          onClick={() => props.editor.chain().focus().toggleBold().run()}
        >
          <Bold size={17} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          aria-label="Toggle italic"
          onClick={() => props.editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={17} />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="underline"
          aria-label="Toggle underline"
          onClick={() => props.editor.chain().focus().toggleUnderline().run()}
        >
          <Underline size={17} />
        </ToggleGroupItem>
        <ColorPicker onColorChange={handleColorChange} />
      </ToggleGroup>
    </div>
  );
};
