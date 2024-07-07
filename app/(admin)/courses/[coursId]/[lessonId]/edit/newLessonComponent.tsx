"use client";

import { PreviewPdf } from "@/src/components/dashboard/preview_lesson/preview-pdf";
import TailwindEditor from "@/src/components/dashboard/tiptap/Editor";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { UploadDropzone } from "@/src/utils/uploadthing";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { JSONContent } from "novel";
import { useState } from "react";
import { toast } from "sonner";
import { ClientUploadedFileData } from "uploadthing/types";
import {
  checkTitleLessonAction,
  createLesson,
  createLesssonPDF,
  getLesson,
  updateLesson,
  updateLessonPdf,
} from "./lesson.action";
import { lessonType, lessonTypePDF } from "./lesson.schema";

export type NewLessonComponentProps = {
  courseId: string;
  lessonId?: string;
};

export const NewLessonComponent = (props: NewLessonComponentProps) => {
  const [title, setTitle] = useState("");
  const [titleLesson, setTitleLesson] = useState<string>("");
  const [content, setContent] = useState<JSONContent | null>(null);
  const router = useRouter();
  const [files, setFiles] = useState<ClientUploadedFileData<null>[]>([]);

  const isCreate = !Boolean(props.lessonId);

  const mutation = useMutation({
    mutationFn: async (values: lessonType) => {
      // await convertToPDF({
      //   type: "doc",
      //   content: content,
      // });
      if (isCreate) {
        const checkTitle = await checkTitleLessonAction(values.title);
        if (checkTitle) {
          toast.error("Le titre de la leçon est déjà utilisé");
          return;
        }
        if (!content || !title) {
          toast.error("Veuillez remplir tous les champs ( titre et contenu )");
          return;
        }
      }
      const { data, serverError } = isCreate
        ? await createLesson(values)
        : await updateLesson({ id: props.lessonId as string, data: values });
      if (serverError || !data) {
        throw new Error(serverError);
      }
      isCreate
        ? toast.success("La leçon a été créée avec succès")
        : toast.success("La leçon a été modifiée avec succès");
      localStorage.setItem(
        "novel-content",
        JSON.stringify({
          type: "doc",
          content: [""],
        })
      );
      router.push(`/courses/${data.courseId}`);
    },
  });

  const mutationPDF = useMutation({
    mutationFn: async (values: lessonTypePDF) => {
      if (isCreate) {
        const checkTitle = await checkTitleLessonAction(values.title);
        if (checkTitle) {
          toast.error("Le titre de la leçon est déjà utilisé");
          return;
        }
        if (!titleLesson) {
          toast.error("Veuillez remplir le titre de la leçon");
          return;
        }
      }
      const { data, serverError } = isCreate
        ? await createLesssonPDF(values)
        : await updateLessonPdf({ id: props.lessonId as string, data: values });
      if (serverError || !data) {
        throw new Error(serverError);
      }
      isCreate
        ? toast.success("La leçon a été créée avec succès")
        : toast.success("La leçon a été modifiée avec succès");
      router.push(`/courses/${data.courseId}`);
    },
  });

  const {
    data: lesson,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["getLesson", props.lessonId],
    queryFn: async () => {
      if (!props.lessonId) {
        throw new Error("No lessonId provided");
      }
      const lesson = await getLesson(props.lessonId as string);
      return lesson;
    },
    enabled: !!props.lessonId,
  });

  if (!lesson) {
    return (
      <Tabs defaultValue="create" className="relative w-full h-full ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Créer une leçon</TabsTrigger>
          <TabsTrigger value="import">Importer un fichier</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <Card className="h-full w-full flex flex-col p-0">
            <CardHeader>
              <div className="flex sm:items-center justify-between gap-3 max-sm:flex-col">
                <div>
                  <CardTitle>Créer une leçon</CardTitle>
                  <CardDescription>
                    Rédigez votre nouvelle leçon ci-dessous dans l'éditeur de
                    texte.
                  </CardDescription>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="title">Titre de la leçon</Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Tapez le titre de la leçon"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="w-full overflow-hidden border-t p-0"></CardContent>
            <CardFooter>
              <Button
                onClick={() =>
                  mutation.mutateAsync({
                    title,
                    courseId: props.courseId,
                    content: JSON.stringify(content),
                  })
                }
              >
                Créer la leçon
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent className="h-full w-full" value="import">
          <Card className="h-full w-full flex flex-col p-0">
            <CardHeader>
              <div className="flex sm:items-center justify-between gap-3 max-sm:flex-col">
                <div>
                  <CardTitle>Importer un fichier</CardTitle>
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
                  après avoir importé le fichier, sinon l'importation ne sera
                  pas prise en compte.
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
              <div className="px-6">
                <PreviewPdf
                  url={files[0].url}
                  courseId={props.courseId}
                  lessonId={props.lessonId as string}
                  lessonTitle={titleLesson}
                  viewBreadcrumb={false}
                />
              </div>
            )}
            {files.length > 0 && (
              <div className="flex justify-end items-center gap-2 px-6 pb-6">
                <Button
                  onClick={() =>
                    mutationPDF.mutateAsync({
                      title: titleLesson,
                      courseId: props.courseId,
                      url: files[0].url,
                    })
                  }
                >
                  Créer la leçon
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    );
  }

  if (lesson.url) {
    return (
      <Card className="h-full w-full flex flex-col p-0">
        <CardHeader>
          <div className="flex sm:items-center justify-between gap-3 max-sm:flex-col">
            <div>
              <CardTitle>Importer un nouveau fichier</CardTitle>
              <CardDescription>
                Importez un nouveau fichier pour créer une leçon.
              </CardDescription>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">Titre de la leçon</Label>
              <Input
                defaultValue={lesson.title}
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
        <div className="px-6">
          <PreviewPdf
            url={files.length > 0 ? files[0].url : lesson.url}
            courseId={props.courseId}
            lessonId={props.lessonId as string}
            lessonTitle={lesson.title}
            viewBreadcrumb={false}
          />
        </div>
        {files.length > 0 ||
          (titleLesson && (
            <div className="flex justify-end items-center gap-2 px-6 pb-6">
              <Button
                onClick={() =>
                  mutationPDF.mutateAsync({
                    title: titleLesson ? titleLesson : lesson.title,
                    courseId: props.courseId,
                    url:
                      files.length > 0 ? files[0].url : (lesson.url as string),
                  })
                }
              >
                Modifier la leçon
              </Button>
            </div>
          ))}
      </Card>
    );
  }

  if (lesson.document) {
    return (
      <Card className="h-full w-full flex flex-col p-0">
        <CardHeader>
          <div className="flex sm:items-center justify-between gap-3 max-sm:flex-col">
            <div>
              <CardTitle>Modifier la leçon : {lesson.title} </CardTitle>
              <CardDescription>
                Rédigez votre nouvelle leçon ci-dessous dans l'éditeur de texte.
              </CardDescription>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">Titre de la leçon</Label>
              <Input
                defaultValue={lesson.title}
                type="text"
                id="title"
                placeholder="Tapez le titre de la leçon"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 w-full overflow-hidden border-t p-0">
          <div className="w-full overflow-y-scroll pt-3">
            <TailwindEditor
              setContent={setContent}
              initialContent={lesson.document as JSONContent}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() =>
              mutation.mutateAsync({
                title: title ? title : lesson.title,
                courseId: props.courseId,
                content: content
                  ? JSON.stringify(content)
                  : JSON.stringify(lesson.document),
              })
            }
          >
            Modifier la leçon
          </Button>
        </CardFooter>
      </Card>
    );
  }
};
