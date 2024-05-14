"use client";

import { ArrowLeft, ArrowRight, Expand, Shrink } from "lucide-react";
import { Button } from "../../ui/button";

export type TopBarPdfProps = {
  setNumPages: (numPages: number) => void;
  numPages: number | undefined;
  setPageNumber: (pageNumber: number) => void;
  pageNumber: number;
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
};

export const TopBarPdf = (props: TopBarPdfProps) => {
  return (
    <div className="h-14 w-full border-b flex items-center justify-between rounded-md border p-2">
      <div className="flex items-center gap-1.5">
        <Button
          size="icon"
          variant="secondary"
          onClick={() => props.setPageNumber(props.pageNumber - 1)}
          disabled={props.pageNumber === 1}
        >
          <ArrowLeft size={20} />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => props.setPageNumber(props.pageNumber + 1)}
          disabled={props.pageNumber === props.numPages}
        >
          <ArrowRight size={20} />
        </Button>
        <span className="text-sm">
          Page {props.pageNumber} sur {props.numPages}
        </span>
      </div>
      <div>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => props.setIsFullScreen(!props.isFullScreen)}
        >
          {props.isFullScreen ? <Shrink size={20} /> : <Expand size={20} />}
        </Button>
      </div>
    </div>
  );
};
