"use client";

import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Button } from "../../ui/button";
import { BreadcrumbComponent } from "../Breadcrumb";
import { TopBarPdf } from "./top-bar-pdf";

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
  const [scale, setScale] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  useEffect(() => {
    const handleResize = () => {
      let newScale = window.innerWidth / 1000;
      newScale = newScale < 0.65 ? 0.65 : newScale;
      newScale = newScale > 1 ? 1 : newScale;
      setScale(newScale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
      <div
        className={`w-full bg-background flex flex-col items-center pt-5 ${
          isFullScreen
            ? "fixed top-0 left-0 h-screen w-screen bg-background z-[123456] items-center justify-center px-5"
            : ""
        }`}
      >
        <TopBarPdf
          setIsFullScreen={setIsFullScreen}
          isFullScreen={isFullScreen}
          setNumPages={setNumPages}
          numPages={numPages}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
        />
        <div
          className={`flex-1 w-full max-h-screen flex justify-center max-sm:overflow-hidden mt-5`}
        >
          <div>
            <Document
              file={props.url}
              onLoadSuccess={onDocumentLoadSuccess}
              className="max-h-ful"
            >
              <Page pageNumber={pageNumber} scale={scale} />
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
};
