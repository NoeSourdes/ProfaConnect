"use client";

import { Button } from "@/src/components/ui/button";
import { useGetInfo } from "@/src/hooks/documents/use-get-info";
import { Info } from "lucide-react";

export const ButtonInfo = () => {
  const { setIsOpenModalInfo } = useGetInfo();

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={() => {
        setIsOpenModalInfo();
      }}
    >
      <Info size={18} className="cursor-pointer" />
    </Button>
  );
};
