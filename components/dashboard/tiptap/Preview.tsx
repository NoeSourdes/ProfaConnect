"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
      <DialogContent className="h-full overflow-y-scroll">
        <EditorRootComponent editable={false} initialContent={props.content} />
      </DialogContent>
    </Dialog>
  );
};
