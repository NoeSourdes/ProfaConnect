import { createBasicElementsPlugin } from "@udecode/plate-basic-elements";
import { createPlugins } from "@udecode/plate-core";
import { createImagePlugin } from "@udecode/plate-media";
import { createSelectOnBackspacePlugin } from "@udecode/plate-select";

import { plateUI } from "@/src/lib/plate-ui/plateUI";

import { basicMarksPlugins } from "./basicMarksPlugins";
import { selectOnBackspacePlugin } from "./selectOnBackspacePlugin";

export const imagePlugins = createPlugins(
  [
    createBasicElementsPlugin(),
    ...basicMarksPlugins,
    createImagePlugin(),
    createSelectOnBackspacePlugin(selectOnBackspacePlugin),
  ],
  {
    components: plateUI,
  }
);
