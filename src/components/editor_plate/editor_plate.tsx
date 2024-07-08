"use client";

import { withProps } from "@udecode/cn";
import { createAlignPlugin } from "@udecode/plate-alignment";
import { createAutoformatPlugin } from "@udecode/plate-autoformat";
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
} from "@udecode/plate-basic-marks";
import {
  ELEMENT_BLOCKQUOTE,
  createBlockquotePlugin,
} from "@udecode/plate-block-quote";
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from "@udecode/plate-break";
import { createCaptionPlugin } from "@udecode/plate-caption";
import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX,
  createCodeBlockPlugin,
  isCodeBlockEmpty,
  isSelectionAtCodeBlockStart,
  unwrapCodeBlock,
} from "@udecode/plate-code-block";
import {
  CommentsProvider,
  MARK_COMMENT,
  createCommentsPlugin,
} from "@udecode/plate-comments";
import {
  Plate,
  PlateElement,
  PlateLeaf,
  RenderAfterEditable,
  createPlugins,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  someNode,
} from "@udecode/plate-common";
import { createDndPlugin } from "@udecode/plate-dnd";
import {
  ELEMENT_EXCALIDRAW,
  createExcalidrawPlugin,
} from "@udecode/plate-excalidraw";
import {
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createFontFamilyPlugin,
  createFontSizePlugin,
  createFontWeightPlugin,
} from "@udecode/plate-font";
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  KEYS_HEADING,
  createHeadingPlugin,
} from "@udecode/plate-heading";
import {
  MARK_HIGHLIGHT,
  createHighlightPlugin,
} from "@udecode/plate-highlight";
import {
  ELEMENT_HR,
  createHorizontalRulePlugin,
} from "@udecode/plate-horizontal-rule";
import { createIndentPlugin } from "@udecode/plate-indent";
import {
  KEY_LIST_STYLE_TYPE,
  createIndentListPlugin,
} from "@udecode/plate-indent-list";
import { createJuicePlugin } from "@udecode/plate-juice";
import { MARK_KBD, createKbdPlugin } from "@udecode/plate-kbd";
import {
  ELEMENT_COLUMN,
  ELEMENT_COLUMN_GROUP,
  createColumnPlugin,
} from "@udecode/plate-layout";
import { createLineHeightPlugin } from "@udecode/plate-line-height";
import { ELEMENT_LINK, createLinkPlugin } from "@udecode/plate-link";
import {
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
  createTodoListPlugin,
} from "@udecode/plate-list";
import {
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
  createImagePlugin,
  createMediaEmbedPlugin,
} from "@udecode/plate-media";
import { ELEMENT_MENTION, createMentionPlugin } from "@udecode/plate-mention";
import { createNodeIdPlugin } from "@udecode/plate-node-id";
import {
  ELEMENT_PARAGRAPH,
  createParagraphPlugin,
} from "@udecode/plate-paragraph";
import { createResetNodePlugin } from "@udecode/plate-reset-node";
import { createDeletePlugin } from "@udecode/plate-select";
import { createBlockSelectionPlugin } from "@udecode/plate-selection";
import { createDeserializeCsvPlugin } from "@udecode/plate-serializer-csv";
import { createDeserializeDocxPlugin } from "@udecode/plate-serializer-docx";
import { createDeserializeMdPlugin } from "@udecode/plate-serializer-md";
import { createTabbablePlugin } from "@udecode/plate-tabbable";
import {
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TH,
  ELEMENT_TR,
  createTablePlugin,
} from "@udecode/plate-table";
import { ELEMENT_TOGGLE, createTogglePlugin } from "@udecode/plate-toggle";
import { createTrailingBlockPlugin } from "@udecode/plate-trailing-block";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { BlockquoteElement } from "@/src/components/plate-ui/blockquote-element";
import { CodeBlockElement } from "@/src/components/plate-ui/code-block-element";
import { CodeLeaf } from "@/src/components/plate-ui/code-leaf";
import { CodeLineElement } from "@/src/components/plate-ui/code-line-element";
import { CodeSyntaxLeaf } from "@/src/components/plate-ui/code-syntax-leaf";
import { CommentLeaf } from "@/src/components/plate-ui/comment-leaf";
import { CommentsPopover } from "@/src/components/plate-ui/comments-popover";
import { Editor } from "@/src/components/plate-ui/editor";
import { ExcalidrawElement } from "@/src/components/plate-ui/excalidraw-element";
import { FixedToolbar } from "@/src/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/src/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/src/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/src/components/plate-ui/floating-toolbar-buttons";
import { HeadingElement } from "@/src/components/plate-ui/heading-element";
import { HighlightLeaf } from "@/src/components/plate-ui/highlight-leaf";
import { HrElement } from "@/src/components/plate-ui/hr-element";
import { ImageElement } from "@/src/components/plate-ui/image-element";
import { KbdLeaf } from "@/src/components/plate-ui/kbd-leaf";
import { LinkElement } from "@/src/components/plate-ui/link-element";
import { LinkFloatingToolbar } from "@/src/components/plate-ui/link-floating-toolbar";
import { MediaEmbedElement } from "@/src/components/plate-ui/media-embed-element";
import { MentionElement } from "@/src/components/plate-ui/mention-element";
import { ParagraphElement } from "@/src/components/plate-ui/paragraph-element";
import { withPlaceholders } from "@/src/components/plate-ui/placeholder";
import {
  TableCellElement,
  TableCellHeaderElement,
} from "@/src/components/plate-ui/table-cell-element";
import { TableElement } from "@/src/components/plate-ui/table-element";
import { TableRowElement } from "@/src/components/plate-ui/table-row-element";
import { TodoListElement } from "@/src/components/plate-ui/todo-list-element";
import { withDraggables } from "@/src/components/plate-ui/with-draggables";
import { autoformatRules } from "@/src/lib/plate-ui/plugins/autoformatRules";
import { createBasicElementsPlugin } from "@udecode/plate-basic-elements";
import {
  ELEMENT_CLOUD_ATTACHMENT,
  ELEMENT_CLOUD_IMAGE,
  createCloudAttachmentPlugin,
  createCloudImagePlugin,
  createCloudPlugin,
} from "@udecode/plate-cloud";
import { createListPlugin } from "@udecode/plate-list";
import { createSelectOnBackspacePlugin } from "@udecode/plate-select";
import { useEffect, useRef, useState } from "react";
import { CloudAttachmentElement } from "../plate-ui/cloud-attachment-element";
import { CloudImageElement } from "../plate-ui/cloud-image-element";
import { ColumnElement } from "../plate-ui/column-element";
import { ColumnGroupElement } from "../plate-ui/column-group-element";
import { ListElement } from "../plate-ui/list-element";
import { TabbableElement } from "../plate-ui/tabbable-element";
import { ToggleElement } from "../plate-ui/toggle-element";
import { Button } from "../ui/button";

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
  defaultType: ELEMENT_PARAGRAPH,
};

const resetBlockTypesCodeBlockRule = {
  types: [ELEMENT_CODE_BLOCK],
  defaultType: ELEMENT_PARAGRAPH,
  onReset: unwrapCodeBlock,
};

const plugins = createPlugins(
  [
    // gestion du cloud
    createCloudPlugin({
      options: {
        apiKey: "PRTV_D8XOsYGAv4mX5N8D_ttMwFbmsfyHLokGRrTMvOOgltsLl2so4",
      },
    }),
    createCloudAttachmentPlugin(),
    createCloudImagePlugin({
      options: {
        maxInitialWidth: 320,
        maxInitialHeight: 320,
        minResizeWidth: 100,
        maxResizeWidth: 720,
      },
    }),
    // gestion de excalidraw
    createExcalidrawPlugin(),
    createSelectOnBackspacePlugin({
      options: {
        query: {
          allow: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED, ELEMENT_HR],
        },
      },
    }),
    // gestion des listes
    createHeadingPlugin(),
    createParagraphPlugin(),
    createIndentListPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_BLOCKQUOTE,
            ELEMENT_CODE_BLOCK,
          ],
        },
      },
    }),
    createListPlugin(),
    createTodoListPlugin(),
    createBasicElementsPlugin(),

    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHorizontalRulePlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),
    createImagePlugin(),
    createTogglePlugin(),
    createColumnPlugin(),
    createMediaEmbedPlugin(),
    createCaptionPlugin({
      options: { pluginKeys: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED] },
    }),
    createMentionPlugin(),
    createTablePlugin({
      options: {
        initialTableWidth: 600,
      },
    }),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontWeightPlugin(),
    createFontFamilyPlugin(),
    createFontSizePlugin(),
    createHighlightPlugin(),
    createKbdPlugin(),
    createAlignPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_H4,
            ELEMENT_H5,
            ELEMENT_H6,
          ],
        },
      },
    }),
    createIndentPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_H4,
            ELEMENT_H5,
            ELEMENT_H6,
            ELEMENT_BLOCKQUOTE,
            ELEMENT_CODE_BLOCK,
            ELEMENT_TOGGLE,
          ],
        },
      },
    }),
    createLineHeightPlugin({
      inject: {
        props: {
          defaultNodeValue: 1.5,
          validNodeValues: [1, 1.2, 1.5, 2, 3],
          validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3],
        },
      },
    }),
    createAutoformatPlugin({
      options: {
        rules: autoformatRules,
        enableUndoOnDelete: true,
      },
    }),
    createBlockSelectionPlugin({
      options: {
        sizes: {
          top: 0,
          bottom: 0,
        },
      },
    }),
    createDndPlugin({
      options: { enableScroller: true },
    }),
    // createEmojiPlugin({
    //   renderAfterEditable: EmojiCombobox as RenderAfterEditable,
    // }),
    createExitBreakPlugin({
      options: {
        rules: [
          {
            hotkey: "mod+enter",
          },
          {
            hotkey: "mod+shift+enter",
            before: true,
          },
          {
            hotkey: "enter",
            query: {
              start: true,
              end: true,
              allow: KEYS_HEADING,
            },
            relative: true,
            level: 1,
          },
        ],
      },
    }),
    createNodeIdPlugin(),
    createResetNodePlugin({
      options: {
        rules: [
          {
            ...resetBlockTypesCommonRule,
            hotkey: "Enter",
            predicate: isBlockAboveEmpty,
          },
          {
            ...resetBlockTypesCommonRule,
            hotkey: "Backspace",
            predicate: isSelectionAtBlockStart,
          },
          {
            ...resetBlockTypesCodeBlockRule,
            hotkey: "Enter",
            predicate: isCodeBlockEmpty,
          },
          {
            ...resetBlockTypesCodeBlockRule,
            hotkey: "Backspace",
            predicate: isSelectionAtCodeBlockStart,
          },
        ],
      },
    }),
    createDeletePlugin(),
    createSoftBreakPlugin({
      options: {
        rules: [
          { hotkey: "shift+enter" },
          {
            hotkey: "enter",
            query: {
              allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
            },
          },
        ],
      },
    }),
    createTabbablePlugin({
      options: {
        query: (editor) => {
          if (isSelectionAtBlockStart(editor)) return false;

          return !someNode(editor, {
            match: (n) => {
              return !!(
                n.type &&
                ([ELEMENT_TABLE, ELEMENT_LI, ELEMENT_CODE_BLOCK].includes(
                  n.type as string
                ) ||
                  n[KEY_LIST_STYLE_TYPE])
              );
            },
          });
        },
      },
      plugins: [
        {
          key: "tabbable_element",
          isElement: true,
          isVoid: true,
          component: TabbableElement,
        },
      ],
    }),
    createTrailingBlockPlugin({
      options: { type: ELEMENT_PARAGRAPH },
    }),
    // dragOverCursorPlugin(),
    createCommentsPlugin(),
    createDeserializeDocxPlugin(),
    createDeserializeCsvPlugin(),
    createDeserializeMdPlugin(),
    createJuicePlugin(),
  ],
  {
    components: withDraggables(
      withPlaceholders({
        [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
        [ELEMENT_CODE_BLOCK]: CodeBlockElement,
        [ELEMENT_CODE_LINE]: CodeLineElement,
        [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
        [ELEMENT_HR]: HrElement,
        [ELEMENT_H1]: withProps(HeadingElement, { variant: "h1" }),
        [ELEMENT_H2]: withProps(HeadingElement, { variant: "h2" }),
        [ELEMENT_H3]: withProps(HeadingElement, { variant: "h3" }),
        [ELEMENT_H4]: withProps(HeadingElement, { variant: "h4" }),
        [ELEMENT_H5]: withProps(HeadingElement, { variant: "h5" }),
        [ELEMENT_H6]: withProps(HeadingElement, { variant: "h6" }),
        [ELEMENT_CLOUD_ATTACHMENT]: CloudAttachmentElement,
        [ELEMENT_CLOUD_IMAGE]: CloudImageElement,
        [ELEMENT_IMAGE]: ImageElement,
        [ELEMENT_LINK]: LinkElement,
        [ELEMENT_TOGGLE]: ToggleElement,
        [ELEMENT_COLUMN_GROUP]: ColumnGroupElement,
        [ELEMENT_COLUMN]: ColumnElement,
        [ELEMENT_TR]: TableRowElement,
        [ELEMENT_LI]: withProps(PlateElement, { as: "li" }),
        [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
        [ELEMENT_MENTION]: MentionElement,
        [ELEMENT_UL]: withProps(ListElement, { variant: "ul" }),
        [ELEMENT_OL]: withProps(ListElement, { variant: "ol" }),
        [ELEMENT_PARAGRAPH]: ParagraphElement,
        [ELEMENT_TABLE]: TableElement,
        [ELEMENT_TD]: TableCellElement,
        [ELEMENT_TH]: TableCellHeaderElement,
        [ELEMENT_TODO_LI]: TodoListElement,
        [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
        [MARK_BOLD]: withProps(PlateLeaf, { as: "strong" }),
        [MARK_CODE]: CodeLeaf,
        [MARK_HIGHLIGHT]: HighlightLeaf,
        [MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
        [MARK_KBD]: KbdLeaf,
        [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: "s" }),
        [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: "sub" }),
        [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: "sup" }),
        [MARK_UNDERLINE]: withProps(PlateLeaf, { as: "u" }),
        [MARK_COMMENT]: CommentLeaf,
      })
    ),
  }
);

export function PlateEditor() {
  const [value, setValue] = useState<string>();
  const commentsProviderRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (commentsProviderRef.current) {
      const element = commentsProviderRef.current;
      if (!isFullScreen) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if ((element as any).mozRequestFullScreen) {
          (element as any).mozRequestFullScreen();
        } else if ((element as any).webkitRequestFullscreen) {
          (element as any).webkitRequestFullscreen();
        } else if ((element as any).msRequestFullscreen) {
          (element as any).msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullScreenChange
      );
    };
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div ref={commentsProviderRef} className="bg-background">
        <CommentsProvider users={{}} myUserId="1">
          <Plate
            plugins={plugins}
            initialValue={JSON.parse(value || "null")}
            onChange={(newValue) => {
              setValue(JSON.stringify(newValue));
            }}
          >
            <FixedToolbar>
              <FixedToolbarButtons
                handleFullScreen={handleFullScreen}
                isFullScreen={isFullScreen}
              />
            </FixedToolbar>

            <Editor
              focusRing={false}
              className="border-none mt-1 rounded-none"
            />

            <FloatingToolbar className="z-[5001] border rounded-lg px-1">
              <FloatingToolbarButtons />
            </FloatingToolbar>
            <CommentsPopover />
          </Plate>
        </CommentsProvider>
      </div>
    </DndProvider>
  );
}
