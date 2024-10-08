"use client";

import { Pencil, Undo2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { BreadcrumbComponent } from "../Breadcrumb";
import { TopBarPdf } from "./top-bar-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export type PreviewPdfProps = {
  url: string;
  folderId: string;
  fileId: string;
  fileTitle: string;
  viewBreadcrumb?: boolean;
};

export const PreviewPdf = (props: PreviewPdfProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [pourcentage, setPourcentage] = useState<number>(100);
  const [scalePoucentage, setScalePourcentage] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  useEffect(() => {
    setScalePourcentage(pourcentage / 100);
    setScale(pourcentage / 100);
  }, [pourcentage]);

  useEffect(() => {
    const handleResize = () => {
      let newScale = window.innerWidth / 1000;
      newScale = newScale < 0.57 ? 0.57 : newScale;
      newScale = newScale > 1 ? 1 : newScale;
      setScale(newScale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      {props.viewBreadcrumb !== false && (
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-3">
            <Link href={`/documents/${props.folderId}`}>
              <Button size="icon" variant="outline">
                <Undo2 size={18} />
              </Button>
            </Link>
            <BreadcrumbComponent
              array={[
                { item: "Mes documents", link: "/documents" },
                { item: "fichiers", link: `/documents/${props.folderId}` },
                {
                  item: props.fileTitle,
                  link: `/documents/${props.folderId}/${props.fileId}`,
                },
              ]}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon">
                <Pencil size={18} />
              </Button>
            </DialogTrigger>
            <DialogContent className="p-6 space-y-4">
              <DialogHeader>
                <DialogTitle>Modifier le titre de la fichier</DialogTitle>
                <DialogDescription>
                  Modifier le titre de la fichier pour le rendre plus attrayant
                </DialogDescription>
              </DialogHeader>
              <div className="gap-4 w-full">
                <Label htmlFor="title" className="text-right">
                  Titre de la fichier
                </Label>
                <Input
                  id="title"
                  defaultValue={props.fileTitle}
                  className="col-span-3"
                />
              </div>
              <DialogFooter className="flex items-center">
                <Link
                  href={`/documents/${props.folderId}/${props.fileId}/edit`}
                >
                  <Button type="submit" variant="secondary">
                    <span>Plus d'options</span>
                  </Button>
                </Link>
                <Button type="submit">
                  <span>Modifier</span>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
      <div
        className={`w-full bg-background flex flex-col items-center ${
          isFullScreen
            ? "fixed top-0 left-0 h-screen w-screen bg-background z-[123456] items-center justify-center px-5"
            : ""
        } ${props.viewBreadcrumb === false ? "pt-0" : "pt-5"}`}
      >
        <TopBarPdf
          pourcentage={pourcentage}
          setPourcentage={setPourcentage}
          setIsFullScreen={setIsFullScreen}
          isFullScreen={isFullScreen}
          setNumPages={setNumPages}
          numPages={numPages}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
        />
        <div
          className={`flex-1 w-full max-h-screen flex overflow-scroll my-5 scale-[${scalePoucentage}] transform transition-transform ${
            scalePoucentage <= 1.4 && "justify-center"
          }`}
        >
          <div>
            <Document
              file={props.url}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div>Chargement...</div>}
              className="max-h-ful"
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                className="border-2 rounded-xl overflow-hidden"
              />
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
};
