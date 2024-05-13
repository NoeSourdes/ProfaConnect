"use client";

import { ChevronLeft, ChevronRight, Undo2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Skeleton } from "../../ui/skeleton";
import { BreadcrumbComponent } from "../Breadcrumb";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export type PreviewPdfProps = {
  url: string;
  courseId: string;
  lessonId: string;
  lessonTitle: string;
};

export const PreviewPdf = (props: PreviewPdfProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  return (
    <div>
      <div className="flex items-center gap-3 w-full">
        <Link href={`/courses/${props.courseId}`}>
          <Button size="icon" variant="secondary">
            <Undo2 size={20} />
          </Button>
        </Link>
        <BreadcrumbComponent
          array={[
            { item: "Home", link: "/" },
            { item: "Dashboard", link: "/dashboard" },
            { item: "Cours", link: "/courses" },
            { item: "Leçons", link: `/courses/${props.courseId}` },
            {
              item: props.lessonTitle,
              link: `/courses/${props.courseId}/${props.lessonId}`,
            },
          ]}
        />
      </div>
      <Card className="rounded-lg border-none mt-6 shadow-none">
        <CardContent className="p-6 border-t">
          <div className="w-full border-b pb-6 flex justify-between items-center">
            <div className="flex justify-between items-center gap-2">
              <ChevronLeft
                className="cursor-pointer"
                size={20}
                onClick={() => {
                  if (pageNumber > 1) {
                    setPageNumber(pageNumber - 1);
                  }
                }}
              />
              <div className="flex items-center gap-1">
                <Input
                  type="text"
                  className="max-w-10"
                  value={pageNumber}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value > 0 && value <= (numPages ?? 0)) {
                      setPageNumber(value);
                    }
                  }}
                />{" "}
                <span className="text-muted-foreground">/{numPages}</span>
              </div>
              <ChevronRight
                className="cursor-pointer"
                size={20}
                onClick={() => {
                  if (pageNumber < (numPages ?? 0)) {
                    setPageNumber(pageNumber + 1);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex justify-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] rounded-lg overflow-x-hidden">
            <Document
              loading={
                <Skeleton className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]"></Skeleton>
              }
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={() => {
                toast.error("Erreur lors du chargement du fichier PDF.");
              }}
              file={props.url}
              className="sm:max-h-full max-sm:w-[600px]"
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
