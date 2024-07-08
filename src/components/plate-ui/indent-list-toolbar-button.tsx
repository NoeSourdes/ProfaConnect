import { withRef } from "@udecode/cn";
import {
  ListStyleType,
  useIndentListToolbarButton,
  useIndentListToolbarButtonState,
} from "@udecode/plate-indent-list";

import { Icons } from "@/src/components/icons";

import { ToolbarButton } from "./toolbar";

export const IndentListToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType?: ListStyleType;
  }
>(({ nodeType = ListStyleType.Disc }, ref) => {
  const state = useIndentListToolbarButtonState({ nodeType });
  const { props } = useIndentListToolbarButton(state);

  return (
    <ToolbarButton
      ref={ref}
      tooltip={
        nodeType === ListStyleType.Disc ? "Liste à puces" : "Liste numérotée"
      }
      {...props}
    >
      {nodeType === ListStyleType.Disc ? <Icons.ul /> : <Icons.ol />}
    </ToolbarButton>
  );
});
