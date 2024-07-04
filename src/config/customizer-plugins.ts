import { KEY_ALIGN } from "@udecode/plate-alignment";
import { KEY_AUTOFORMAT } from "@udecode/plate-autoformat";
import {
  KEY_EXIT_BREAK,
  KEY_SINGLE_LINE,
  KEY_SOFT_BREAK,
} from "@udecode/plate-break";
import { KEY_CAPTION } from "@udecode/plate-caption";
import { MARK_COMMENT } from "@udecode/plate-comments";
import { KEY_DND } from "@udecode/plate-dnd";
import { KEY_EMOJI } from "@udecode/plate-emoji";
import { ELEMENT_EXCALIDRAW } from "@udecode/plate-excalidraw";
import { MARK_BG_COLOR, MARK_FONT_SIZE } from "@udecode/plate-font";
import { MARK_HIGHLIGHT } from "@udecode/plate-highlight";
import { ELEMENT_HR } from "@udecode/plate-horizontal-rule";
import { KEY_INDENT } from "@udecode/plate-indent";
import { KEY_LIST_STYLE_TYPE } from "@udecode/plate-indent-list";
import { MARK_KBD } from "@udecode/plate-kbd";
import { ELEMENT_COLUMN_GROUP } from "@udecode/plate-layout";
import { KEY_LINE_HEIGHT } from "@udecode/plate-line-height";
import { ELEMENT_LINK } from "@udecode/plate-link";
import { ELEMENT_TODO_LI } from "@udecode/plate-list";
import { ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED } from "@udecode/plate-media";
import { ELEMENT_MENTION } from "@udecode/plate-mention";
import { KEY_NODE_ID } from "@udecode/plate-node-id";
import { KEY_NORMALIZE_TYPES } from "@udecode/plate-normalizers";
import { KEY_RESET_NODE } from "@udecode/plate-reset-node";
import { KEY_BLOCK_SELECTION } from "@udecode/plate-selection";
import { KEY_DESERIALIZE_CSV } from "@udecode/plate-serializer-csv";
import { KEY_DESERIALIZE_DOCX } from "@udecode/plate-serializer-docx";
import { KEY_DESERIALIZE_MD } from "@udecode/plate-serializer-md";
import { KEY_TABBABLE } from "@udecode/plate-tabbable";
import { ELEMENT_TABLE } from "@udecode/plate-table";
import { ELEMENT_TOGGLE } from "@udecode/plate-toggle";
import { KEY_TRAILING_BLOCK } from "@udecode/plate-trailing-block";

import { KEY_DRAG_OVER_CURSOR } from "@/src/lib/plate-ui/plugins/dragOverCursorPlugin";

export type ValueId = "tableMerge" | keyof typeof customizerPlugins;

// cmdk needs lowercase
export const customizerPlugins = {
  align: {
    id: "align",
    label: "Align",
    plugins: [KEY_ALIGN],
    route: "/docs/alignment",
    value: [],
  },
  autoformat: {
    id: "autoformat",
    label: "Autoformat",
    plugins: [KEY_AUTOFORMAT],
    route: "/docs/autoformat",
    value: [],
  },
  basicmarks: {
    id: "basicmarks",
    label: "Basic Marks",
    plugins: [],
    route: "/docs/basic-marks",
    value: [],
  },
  basicnodes: {
    id: "basicnodes",
    label: "Basic Nodes",
    plugins: [],
    route: "/docs/basic-elements",
    value: [],
  },
  blockselection: {
    id: "blockselection",
    label: "Block Selection",
    plugins: [
      KEY_NODE_ID,
      KEY_BLOCK_SELECTION,
      ELEMENT_IMAGE,
      ELEMENT_MEDIA_EMBED,
    ],
    route: "/docs/block-selection",
    value: [],
  },
  caption: {
    id: "caption",
    label: "Caption",
    plugins: [KEY_CAPTION],
    route: "/docs/caption",
    value: [],
  },
  column: {
    id: "column",
    label: "Column",
    plugins: [ELEMENT_COLUMN_GROUP],
    route: "/docs/column",
    value: [],
  },
  comment: {
    id: "comment",
    label: "Comment",
    plugins: [MARK_COMMENT],
    route: "/docs/comments",
    value: [],
  },
  cursoroverlay: {
    id: "cursoroverlay",
    label: "Cursor Overlay",
    plugins: [KEY_DRAG_OVER_CURSOR],
    route: "/docs/cursor-overlay",
    value: [],
  },
  deserializecsv: {
    id: "deserializecsv",
    label: "Deserialize CSV",
    plugins: [KEY_DESERIALIZE_CSV],
    route: "/docs/serializing-csv",
    value: [],
  },
  deserializedocx: {
    id: "deserializedocx",
    label: "Deserialize DOCX",
    plugins: [KEY_DESERIALIZE_DOCX],
    route: "/docs/serializing-docx",
    value: [],
  },
  deserializehtml: {
    id: "deserializehtml",
    label: "Deserialize HTML",
    plugins: [],
    route: "/docs/serializing-html",
    value: [],
  },
  deserializemd: {
    id: "deserializemd",
    label: "Deserialize Markdown",
    plugins: [KEY_DESERIALIZE_MD],
    route: "/docs/serializing-md",
    value: [],
  },
  dnd: {
    id: "dnd",
    label: "Drag & Drop",
    plugins: [KEY_DND],
    route: "/docs/components/draggable",
    value: [],
  },
  emoji: {
    id: "emoji",
    label: "Emoji",
    plugins: [KEY_EMOJI],
    route: "/docs/emoji",
    value: [],
  },
  excalidraw: {
    id: "excalidraw",
    label: "Excalidraw",
    plugins: [ELEMENT_EXCALIDRAW],
    route: "/docs/excalidraw",
    value: [],
  },
  exitbreak: {
    id: "exitbreak",
    label: "Exit Break",
    plugins: [KEY_EXIT_BREAK],
    route: "/docs/exit-break",
    value: [],
  },
  font: {
    id: "font",
    label: "Font",
    plugins: [MARK_FONT_SIZE, MARK_BG_COLOR],
    route: "/docs/font",
    value: [],
  },
  forcedlayout: {
    id: "forcedlayout",
    label: "Forced Layout",
    plugins: [KEY_NORMALIZE_TYPES, KEY_TRAILING_BLOCK],
    route: "/docs/forced-layout",
    value: [],
  },
  highlight: {
    id: "highlight",
    label: "Highlight",
    plugins: [MARK_HIGHLIGHT],
    route: "/docs/highlight",
    value: [],
  },
  hr: {
    id: "hr",
    label: "Horizontal Rule",
    plugins: [ELEMENT_HR],
    route: "/docs/horizontal-rule",
    value: [],
  },
  indent: {
    id: "indent",
    label: "Indent",
    plugins: [KEY_INDENT],
    route: "/docs/indent",
    value: [],
  },
  indentlist: {
    id: "indentlist",
    label: "Indent List",
    plugins: [KEY_LIST_STYLE_TYPE],
    route: "/docs/indent-list",
    value: [],
  },
  kbd: {
    id: "kbd",
    label: "Keyboard Input",
    plugins: [MARK_KBD],
    route: "/docs/components/kbd-leaf",
    value: [],
  },
  lineheight: {
    id: "lineheight",
    label: "Line Height",
    plugins: [KEY_LINE_HEIGHT],
    route: "/docs/line-height",
    value: [],
  },
  link: {
    id: "link",
    label: "Link",
    plugins: [ELEMENT_LINK],
    route: "/docs/link",
    value: [],
  },
  list: {
    id: "list",
    label: "List",
    plugins: ["list"],
    route: "/docs/list",
    value: [],
  },
  media: {
    id: "media",
    label: "Media",
    plugins: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED],
    route: "/docs/media",
    value: [],
  },
  mention: {
    id: "mention",
    label: "Mention",
    plugins: [ELEMENT_MENTION],
    route: "/docs/mention",
    value: [],
  },
  placeholder: {
    id: "placeholder",
    label: "Placeholder",
    plugins: [],
    route: "/docs/components/placeholder",
    value: [],
  },
  playground: {
    id: "playground",
    label: "Playground",
    value: [],
  },
  resetnode: {
    id: "resetnode",
    label: "Reset Node",
    plugins: [KEY_RESET_NODE],
    route: "/docs/reset-node",
    value: [],
  },
  singleline: {
    id: "singleline",
    label: "Single Line",
    plugins: [KEY_SINGLE_LINE],
    route: "/docs/single-line",
    value: [],
  },
  softbreak: {
    id: "softbreak",
    label: "Soft Break",
    plugins: [KEY_SOFT_BREAK],
    route: "/docs/soft-break",
    value: [],
  },
  tabbable: {
    id: "tabbable",
    label: "Tabbable",
    plugins: [KEY_TABBABLE],
    route: "/docs/tabbable",
    value: [],
  },
  table: {
    id: "table",
    label: "Table",
    plugins: [ELEMENT_TABLE],
    route: "/docs/table",
    value: [],
  },
  todoli: {
    id: "todoli",
    label: "Todo List",
    plugins: [ELEMENT_TODO_LI],
    route: "/docs/list",
    value: [],
  },
  toggle: {
    id: "toggle",
    label: "Toggle",
    plugins: [ELEMENT_TOGGLE],
    route: "/docs/toggle",
    value: [],
  },
  trailingblock: {
    id: "trailingblock",
    label: "Trailing Block",
    plugins: [KEY_TRAILING_BLOCK],
    route: "/docs/trailing-block",
    value: [],
  },
};
