"use client";

import {
  ArrowLeft,
  ArrowRight,
  Expand,
  Minus,
  Plus,
  Shrink,
} from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

export type TopBarPdfProps = {
  setNumPages: (numPages: number) => void;
  numPages: number | undefined;
  setPageNumber: (pageNumber: number) => void;
  pageNumber: number;
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
  pourcentage: number;
  setPourcentage: (pourcentage: number) => void;
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
          <ArrowLeft size={18} />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => props.setPageNumber(props.pageNumber + 1)}
          disabled={props.pageNumber === props.numPages}
        >
          <ArrowRight size={18} />
        </Button>
        <span className="text-sm sm:block hidden">
          Page {props.pageNumber} sur {props.numPages}
        </span>
        <span className="text-sm sm:hidden block">
          {props.pageNumber} / {props.numPages}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => {
              if (props.pourcentage > 10) {
                props.setPourcentage(props.pourcentage - 10);
              }
            }}
          >
            <Minus size={18} />
          </Button>
          <Input
            type="text"
            className="max-w-16 w-full"
            value={`${props.pourcentage}%`}
            onChange={(e) => props.setPourcentage(parseInt(e.target.value))}
          ></Input>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => props.setPourcentage(props.pourcentage + 10)}
          >
            <Plus size={18} />
          </Button>
        </div>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => props.setIsFullScreen(!props.isFullScreen)}
        >
          {props.isFullScreen ? <Shrink size={18} /> : <Expand size={18} />}
        </Button>
      </div>
    </div>
  );
};
