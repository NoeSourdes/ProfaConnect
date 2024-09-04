"use client";

import { PreviewPdf } from "@/src/components/dashboard/preview_file/preview-pdf";
import TailwindEditor from "@/src/components/dashboard/tiptap/Editor";
import { PlateEditor } from "@/src/components/editor_plate/editor_plate";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { JSONContent } from "novel";
import { useState } from "react";
import { toast } from "sonner";
import {
  checkTitleFileAction,
  createFile,
  createFilePDF,
  getFileFolderId,
  updateFile,
  updateFilePdf,
} from "../../../../../../actions/admin/files/file.action";
import {
  fileType,
  fileTypePDF,
} from "../../../../../../actions/admin/files/file.schema";
import { ComponentDropZone } from "./ComponentDropZone";

export type NewFileComponentProps = {
  folderId?: string;
  fileId?: string;
};

export const NewFileComponent = (props: NewFileComponentProps) => {
  const [title, setTitle] = useState("");
  const [titleFile, setTitleFile] = useState<string>("");
  const [content, setContent] = useState<JSONContent | null>(null);
  const router = useRouter();
  const [fileUpload, setFileUpload] = useState<string>("");
  const pathname = usePathname();
  const redirect = pathname.split("/")[pathname.split("/").length - 2];
  const queryClient = useQueryClient();
  const { data: user } = useSession();

  const isCreate = !Boolean(props.fileId);

  const mutation = useMutation({
    mutationFn: async (values: fileType) => {
      // await convertToPDF({
      //   type: "doc",
      //   content: content,
      // });
      if (isCreate) {
        const checkTitle = await checkTitleFileAction(values.title);
        if (checkTitle) {
          toast.error("Le titre du fichier est déjà utilisé");
          return;
        }
        if (!content || !title) {
          toast.error("Veuillez remplir tous les champs ( titre et contenu )");
          return;
        }
      }
      const { data, serverError } = isCreate
        ? await createFile(values)
        : await updateFile({ id: props.fileId as string, data: values });
      if (serverError || !data) {
        throw new Error(serverError);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getFiles", user?.user?.id ? user.user.id : ""],
      });
      isCreate
        ? toast.success("La fichier a été créée avec succès")
        : toast.success("La fichier a été modifiée avec succès");
      localStorage.setItem(
        "novel-content",
        JSON.stringify({
          type: "doc",
          content: [""],
        })
      );
      if (redirect === "documents") {
        router.push(`/documents`);
      } else {
        router.push(`/documents/${redirect}`);
      }
    },
  });

  const mutationPDF = useMutation({
    mutationFn: async (values: fileTypePDF) => {
      if (isCreate) {
        const checkTitle = await checkTitleFileAction(values.title);
        if (checkTitle) {
          toast.error("Le titre du fichier est déjà utilisé");
          return;
        }
        if (!titleFile) {
          toast.error("Veuillez remplir le titre du fichier");
          return;
        }
      }
      const { data, serverError } = isCreate
        ? await createFilePDF(values)
        : await updateFilePdf({ id: props.fileId as string, data: values });
      if (serverError || !data) {
        throw new Error(serverError);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getFiles", user?.user?.id ? user.user.id : ""],
      });
      isCreate
        ? toast.success("La fichier a été créée avec succès")
        : toast.success("La fichier a été modifiée avec succès");
      if (redirect === "documents") {
        router.push(`/documents`);
      } else {
        router.push(`/documents/${redirect}`);
      }
    },
  });

  const {
    data: file,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["getFile", props.fileId],
    queryFn: async () => {
      if (!props.fileId) {
        throw new Error("No fileId provided");
      }
      const file = await getFileFolderId(props.fileId as string);
      return file;
    },
    enabled: !!props.fileId,
  });

  if (!file) {
    return (
      <Tabs defaultValue="create" className="w-full h-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Créer un fichier</TabsTrigger>
          <TabsTrigger value="import">Importer un fichier</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="">
          <Card className="h-full w-full flex flex-col p-0 shadow-none">
            <CardHeader>
              <div className="flex sm:items-center justify-between gap-3 max-sm:flex-col">
                <div>
                  <CardTitle>Créer un fichier</CardTitle>
                  <CardDescription>
                    Rédigez votre nouveau fichier ci-dessous dans l'éditeur de
                    texte.
                  </CardDescription>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="title">Titre du fichier</Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Tapez le titre du fichier"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="w-full overflow-hidden border-t p-0">
              <PlateEditor />
            </CardContent>
            <CardFooter>
              <Button
                onClick={() =>
                  mutation.mutateAsync({
                    title,
                    folderId: props.folderId ?? "",
                    content: JSON.stringify(content),
                  })
                }
              >
                Créer le fichier
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent className="h-full w-full" value="import">
          <Card className="h-full w-full flex flex-col p-0 shadow-none">
            <CardHeader>
              <div className="flex sm:items-center justify-between gap-3 max-sm:flex-col">
                <div>
                  <CardTitle>Importer un fichier</CardTitle>
                  <CardDescription>
                    Importez un fichier pour créer un fichier.
                  </CardDescription>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="title">Titre du fichier</Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Tapez le titre du fichier"
                    onChange={(e) => setTitleFile(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="border-t pt-5 ">
              <ComponentDropZone setFiles={setFileUpload} />
            </CardContent>
            {fileUpload && (
              <div className="px-6">
                <PreviewPdf
                  url={fileUpload}
                  folderId={props.folderId ?? ""}
                  fileId={props.fileId as string}
                  fileTitle={titleFile}
                  viewBreadcrumb={false}
                />
              </div>
            )}
            {fileUpload && (
              <div className="flex justify-end items-center gap-2 px-6 pb-6">
                <Button
                  onClick={() =>
                    mutationPDF.mutateAsync({
                      title: titleFile,
                      folderId: props.folderId ?? "",
                      url: fileUpload,
                    })
                  }
                >
                  Créer le fichier
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    );
  }

  if (file.url) {
    return (
      <Card className="h-full w-full flex flex-col p-0">
        <CardHeader>
          <div className="flex sm:items-center justify-between gap-3 max-sm:flex-col">
            <div>
              <CardTitle>Importer un nouveau fichier</CardTitle>
              <CardDescription>
                Importez un nouveau fichier pour créer un fichier.
              </CardDescription>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">Titre du fichier</Label>
              <Input
                defaultValue={file.title}
                type="text"
                id="title"
                placeholder="Tapez le titre du fichier"
                onChange={(e) => setTitleFile(e.target.value)}
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
          <ComponentDropZone setFiles={setFileUpload} />
        </CardContent>
        <div className="px-6">
          <PreviewPdf
            url={fileUpload.length > 0 ? fileUpload : file.url}
            folderId={props.folderId ?? ""}
            fileId={props.fileId as string}
            fileTitle={file.title}
            viewBreadcrumb={false}
          />
        </div>
        {fileUpload.length > 0 ||
          (titleFile && (
            <div className="flex justify-end items-center gap-2 px-6 pb-6">
              <Button
                onClick={() =>
                  mutationPDF.mutateAsync({
                    title: titleFile ? titleFile : file.title,
                    folderId: props.folderId ?? "",
                    url: fileUpload ? fileUpload : (file.url as string),
                  })
                }
              >
                Modifier la fichier
              </Button>
            </div>
          ))}
      </Card>
    );
  }

  if (file.document) {
    return (
      <Card className="h-full w-full flex flex-col p-0">
        <CardHeader>
          <div className="flex sm:items-center justify-between gap-3 max-sm:flex-col">
            <div>
              <CardTitle>Modifier la fichier : {file.title} </CardTitle>
              <CardDescription>
                Rédigez votre nouveau fichier ci-dessous dans l'éditeur de
                texte.
              </CardDescription>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">Titre du fichier</Label>
              <Input
                defaultValue={file.title}
                type="text"
                id="title"
                placeholder="Tapez le titre du fichier"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 w-full overflow-hidden border-t p-0">
          <div className="w-full overflow-y-scroll pt-3">
            <TailwindEditor
              setContent={setContent}
              initialContent={file.document as JSONContent}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() =>
              mutation.mutateAsync({
                title: title ? title : file.title,
                folderId: props.folderId ?? "",
                content: content
                  ? JSON.stringify(content)
                  : JSON.stringify(file.document),
              })
            }
          >
            Modifier la fichier
          </Button>
        </CardFooter>
      </Card>
    );
  }
};
