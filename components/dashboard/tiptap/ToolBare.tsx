import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

export type ToolBareProps = {
  editor: any;
};

export const ToolBare = (props: ToolBareProps) => {
  if (!props.editor) {
    return null;
  }
  return (
    <div className="border-b p-2">
      <ToggleGroup type="multiple" className="flex justify-start">
        <ToggleGroupItem
          value="bold"
          aria-label="Toggle bold"
          onClick={() => props.editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="italic"
          aria-label="Toggle italic"
          onClick={() => props.editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="underline"
          aria-label="Toggle underline"
          onClick={() => props.editor.chain().focus().toggleUnderline().run()}
        >
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
