"use client";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { EditorRootComponent } from "./component_editor/EditorRootComponent";

export type PreviewProps = {
  content: any;
};

export const Preview = (props: PreviewProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Aperçu</Button>
      </DialogTrigger>
      <DialogContent className="h-full overflow-y-scroll shadow-lg">
        <EditorRootComponent editable={false} initialContent={props.content} />
      </DialogContent>
    </Dialog>
  );
};
