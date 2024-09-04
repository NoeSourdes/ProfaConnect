"use client";

import { Button } from "@/src/components/ui/button";
import { useGetTreeView } from "@/src/hooks/documents/use-get-tree-view";
import { FolderTree } from "lucide-react";

export const ButtonGetTreeView = () => {
  const { setIsOpenModalTreeView } = useGetTreeView();

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={() => {
        setIsOpenModalTreeView();
      }}
    >
      <FolderTree size={18} className="cursor-pointer" />
    </Button>
  );
};
