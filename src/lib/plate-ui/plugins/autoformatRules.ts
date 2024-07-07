import {
  AutoformatRule,
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  autoformatSmartQuotes,
} from "@udecode/plate-autoformat";

import { autoformatBlocks } from "@/src/lib/plate-ui/plugins/autoformatBlocks";
import { autoformatIndentLists } from "@/src/lib/plate-ui/plugins/autoformatIndentLists";
import { autoformatMarks } from "@/src/lib/plate-ui/plugins/autoformatMarks";

export const autoformatRules = [
  ...autoformatBlocks,
  ...autoformatIndentLists,
  ...autoformatMarks,
  ...(autoformatSmartQuotes as AutoformatRule[]),
  ...(autoformatPunctuation as AutoformatRule[]),
  ...(autoformatLegal as AutoformatRule[]),
  ...(autoformatLegalHtml as AutoformatRule[]),
  ...(autoformatArrow as AutoformatRule[]),
  ...(autoformatMath as AutoformatRule[]),
];
