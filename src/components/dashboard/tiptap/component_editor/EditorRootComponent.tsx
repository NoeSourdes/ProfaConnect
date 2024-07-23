"use client";

import { Separator } from "@/src/components/ui/separator";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { ColorSelector } from "../selectors/color-selector";
import { LinkSelector } from "../selectors/link-selector";
import { NodeSelector } from "../selectors/node-selector";

import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { useEffect, useState } from "react";
import { defaultExtensions } from "../extensions.preview";
import GenerativeMenuSwitch from "../generative/generative-menu-switch";
import { uploadFn } from "../image-upload";
import { TextButtons } from "../selectors/text-buttons";
import { slashCommand, suggestionItems } from "../slash-command";

export type EditorRootComponentProps = {
  editable?: boolean;
  initialContent?: any;
  debouncedUpdates?: any;
  setSaveStatus?: any;
  openNode?: any;
  setOpenNode?: any;
  openColor?: any;
  setOpenColor?: any;
  openLink?: any;
  setOpenLink?: any;
  openAI?: any;
  setOpenAI?: any;
};

export const EditorRootComponent = (props: EditorRootComponentProps) => {
  const extensions = [...defaultExtensions, slashCommand];
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        props.initialContent.content[1].attrs.width = img.width;
        props.initialContent.content[1].attrs.height = img.height;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);
  return (
    <EditorRoot>
      <EditorContent
        editable={props.editable ?? true}
        initialContent={props.initialContent}
        extensions={extensions}
        className="relative min-h-[500px] w-full max-w-screen-lg bg-background"
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
          handleDrop: (view, event, _slice, moved) =>
            handleImageDrop(view, event, moved, uploadFn),
          attributes: {
            class:
              "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
          },
        }}
        onUpdate={({ editor }) => {
          props.debouncedUpdates(editor);
          props.setSaveStatus("En cours de sauvegarde...");
        }}
        slotAfter={props.editable !== false && <ImageResizer />}
      >
        {props.editable !== false ? (
          <>
            <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
              <EditorCommandEmpty className="px-2 text-muted-foreground">
                Pas de résultats
              </EditorCommandEmpty>
              <EditorCommandList>
                {suggestionItems.map((item) => (
                  <EditorCommandItem
                    value={item.title}
                    onCommand={(val) => item.command && item.command(val)}
                    className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                    key={item.title}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </EditorCommandItem>
                ))}
              </EditorCommandList>
            </EditorCommand>

            <GenerativeMenuSwitch
              open={props.openAI}
              onOpenChange={props.setOpenAI}
            >
              <Separator orientation="vertical" />
              <NodeSelector
                open={props.openNode}
                onOpenChange={props.setOpenNode}
              />
              <Separator orientation="vertical" />

              <LinkSelector
                open={props.openLink}
                onOpenChange={props.setOpenLink}
              />
              <Separator orientation="vertical" />
              <TextButtons />
              <Separator orientation="vertical" />
              <ColorSelector
                open={props.openColor}
                onOpenChange={props.setOpenColor}
              />
            </GenerativeMenuSwitch>
          </>
        ) : (
          <></>
        )}
      </EditorContent>
    </EditorRoot>
  );
};
