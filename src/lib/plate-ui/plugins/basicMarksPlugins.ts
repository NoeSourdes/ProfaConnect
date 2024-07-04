import {
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
} from "@udecode/plate-basic-marks";
import { createPlugins } from "@udecode/plate-common";

import { plateUI } from "@/src/lib/plate-ui/plateUI";

export const basicMarksPlugins = createPlugins(
  [
    createBoldPlugin(),
    createCodePlugin(),
    createItalicPlugin(),
    createStrikethroughPlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createUnderlinePlugin(),
  ],
  {
    components: plateUI,
  }
);
