"use client";

import { withRef } from "@udecode/cn";
import { useIndentButton } from "@udecode/plate-indent/react";
import { Indent } from "lucide-react";

import { ToolbarButton } from "./toolbar";

export const IndentToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const { props } = useIndentButton();

    return (
      <ToolbarButton ref={ref} tooltip="Indenter" {...props} {...rest}>
        <Indent />
      </ToolbarButton>
    );
  }
);
