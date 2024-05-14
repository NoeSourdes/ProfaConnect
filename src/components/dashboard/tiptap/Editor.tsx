"use client";

import { Button } from "@/src/components/ui/button";
import { defaultEditorContent } from "@/src/lib/content";
import { Expand, Shrink } from "lucide-react";
import { type EditorInstance, type JSONContent } from "novel";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { EditorRootComponent } from "./component_editor/EditorRootComponent";
import { useFullScreen } from "./fullScreen.store";

export type EditorProps = {
  editable?: boolean;
  setContent?: (content: JSONContent) => void;
  initialContent?: JSONContent;
};

const TailwindAdvancedEditor = (props: EditorProps) => {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    null
  );
  const [saveStatus, setSaveStatus] = useState("Sauvegardé");

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);
  const { isFullScreen, setIsFullScreen } = useFullScreen();

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      window.localStorage.setItem("html-content", editor.getHTML());
      window.localStorage.setItem("novel-content", JSON.stringify(json));
      window.localStorage.setItem(
        "markdown",
        editor.storage.markdown.getMarkdown()
      );
      if (props.setContent) props.setContent(json);
      setSaveStatus("Sauvegardé");
    },
    500
  );

  useEffect(() => {
    if (props.initialContent) setInitialContent(props.initialContent);
    else {
      const content = window.localStorage.getItem("novel-content");
      if (content) setInitialContent(JSON.parse(content));
      else setInitialContent([defaultEditorContent]);
    }
  }, [props.initialContent]);

  if (!initialContent) return null;

  return (
    <div className={`relative w-full h-full`}>
      <div
        className={`${
          isFullScreen
            ? "fixed inset-0 z-50 bg-background overflow-y-scroll"
            : "z-10"
        }`}
      >
        <div
          className={`${
            isFullScreen ? "fixed" : "absolute"
          } flex items-center gap-2 z-10 mb-5 ${
            isFullScreen
              ? "right-3 top-3"
              : "max-lg:right-3 right-0 max-sm:right-8 top-0"
          }`}
        >
          {props.editable !== false && (
            <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
              {saveStatus}
            </div>
          )}
          <Button
            size="icon"
            variant="outline"
            onClick={toggleFullScreen}
            className="text-muted-foreground"
          >
            {!isFullScreen ? <Expand size={20} /> : <Shrink size={20} />}
          </Button>
        </div>
        <EditorRootComponent
          editable={props.editable}
          initialContent={initialContent}
          debouncedUpdates={debouncedUpdates}
          setSaveStatus={setSaveStatus}
          openNode={openNode}
          setOpenNode={setOpenNode}
          openColor={openColor}
          setOpenColor={setOpenColor}
          openLink={openLink}
          setOpenLink={setOpenLink}
          openAI={openAI}
          setOpenAI={setOpenAI}
        />
      </div>
    </div>
  );
};

export default TailwindAdvancedEditor;
