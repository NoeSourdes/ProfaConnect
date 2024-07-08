import React from "react";

import { withRef } from "@udecode/cn";
import { useIndentButton } from "@udecode/plate-indent";

import { Icons } from "@/src/components/icons";

import { ToolbarButton } from "./toolbar";

export const IndentToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const { props } = useIndentButton();

    return (
      <ToolbarButton ref={ref} tooltip="Retrait" {...props} {...rest}>
        <Icons.indent />
      </ToolbarButton>
    );
  }
);
