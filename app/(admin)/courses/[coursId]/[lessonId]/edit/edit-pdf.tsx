"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { UploadDropzone } from "@/src/utils/uploadthing";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ClientUploadedFileData } from "uploadthing/types";
import { getLesson, updateLessonPdf } from "./lesson.action";

export type EditPdfComponentProps = {
  courseId: string;
  lessonId: string;
};

export const EditPdfComponent = (props: EditPdfComponentProps) => {
  const [files, setFiles] = useState<ClientUploadedFileData<null>[]>([]);
  const [titleLesson, setTitleLesson] = useState<string>("");

  const {
    data: lesson,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["getLesson", props.lessonId],
    queryFn: async () => {
      const lesson = await getLesson(props.lessonId);
      return lesson;
    },
  });

  const mutationUpadatePDF = useMutation({
    mutationFn: async (values: {
      title: string;
      courseId: string;
      url: string;
    }) => {
      const res = await updateLessonPdf({
        id: String(props.lessonId),
        data: values,
      });
      if (res) {
        toast.success("Leçon créée avec succès");
      }
    },
  });

  return (
    <Card className="h-full w-full flex flex-col p-0">
      <CardHeader>
        <div className="flex sm:items-center justify-between gap-3 max-sm:flex-col">
          <div>
            <CardTitle>Importer un nouveau fichier</CardTitle>
            <CardDescription>
              Importez un fichier pour créer une leçon.
            </CardDescription>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="title">Titre de la leçon</Label>
            <Input
              type="text"
              id="title"
              placeholder="Tapez le titre de la leçon"
              onChange={(e) => setTitleLesson(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="border-t pt-5 ">
        <div className="w-full rounded-lg border-dashed bg-warning/10 border-warning-border text-warning-border border-[1px] p-3 flex items-center">
          <p>
            <span className="font-semibold border rounded px-1 py-[0.5px] border-warning-border bg-warning-border/15">
              Veuillez
            </span>{" "}
            vous assurer de cliquer à nouveau sur le bouton{" "}
            <span className="font-semibold border rounded px-1 py-[0.5px] border-warning-border bg-warning-border/15">
              Télécharger
            </span>{" "}
            après avoir importé le fichier, sinon l'importation ne sera pas
            prise en compte.
          </p>
        </div>
        <UploadDropzone
          content={{
            label: "Déposez un fichier ici ou cliquez pour importer",
            allowedContent: "PDF (4MB)",
            button({ ready, isUploading }) {
              return (
                <Button
                  disabled={!ready || isUploading}
                  className="w-full"
                  type="button"
                >
                  {isUploading ? "Téléchargement..." : "Télécharger"}
                </Button>
              );
            },
          }}
          className="border-dashed border-2 border-foreground-mute"
          endpoint="pdfUploader"
          onClientUploadComplete={(res) => {
            setFiles(res);
            toast.success("Fichier importé avec succès");
          }}
          onUploadError={(error: Error) => {
            toast.error(error.message);
          }}
        />
      </CardContent>
      {files.length > 0 && (
        <CardFooter className="flex items-center gap-2">
          <Link href={files[0].url}>
            <Button variant="outline">Voir le fichier importé</Button>
          </Link>
          <Button
            onClick={() =>
              mutationUpadatePDF.mutateAsync({
                title: titleLesson,
                courseId: props.courseId,
                url: files[0].url,
              })
            }
          >
            Créer la leçon
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
