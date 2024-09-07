"use client";

import { PreviewPdf } from "@/src/components/dashboard/preview_file/preview-pdf";

import { PlateEditor } from "@/src/components/editor_plate/editor_plate";
import { Button, buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/src/components/ui/credenza";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { JSONContent } from "novel";
import { useEffect, useState } from "react";
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
  fileTypeUpload,
} from "../../../../../../actions/admin/files/file.schema";
import { ComponentDropZone } from "./ComponentDropZone";

export type NewFileComponentProps = {
  folderId?: string;
  fileId?: string;
};

export const NewFileComponent = (props: NewFileComponentProps) => {
  const [title, setTitle] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [statusTitle, setStatusTitle] = useState<string>("");
  const [titleFile, setTitleFile] = useState<string>("");
  const [content, setContent] = useState<JSONContent | null>(null);
  const router = useRouter();
  const [fileUpload, setFileUpload] = useState<fileTypeUpload>();
  const pathname = usePathname();
  const redirect = pathname.split("/")[pathname.split("/").length - 2];
  const queryClient = useQueryClient();
  const { data: user } = useSession();
  const [value, setValue] = useState<string>("");

  const isCreate = !Boolean(props.fileId);

  const mutation = useMutation({
    mutationFn: async (values: fileType) => {
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

  useEffect(() => {
    if (title !== "") {
      setIsTyping(true);
      setStatusTitle("Le titre est en cours de vérification");
    }
    const timout = setTimeout(async () => {
      setIsTyping(false);
      const check = await checkTitleFileAction(title);
      if (check) {
        setStatusTitle("Le titre du fichier est déjà utilisé");
      } else {
        setStatusTitle("Le titre du fichier est disponible");
      }
    }, 500);
    return () => clearTimeout(timout);
  }, [title]);

  if (!file) {
    return (
      <Tabs defaultValue="create" className="w-full h-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Créer un fichier</TabsTrigger>
          <TabsTrigger value="import">Importer un fichier</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="">
          <Card className="h-full w-full flex flex-col p-0 shadow-none">
            <CardContent className="w-full overflow-hidden rounded-lg p-0">
              <PlateEditor value={value} setValue={setValue} />
            </CardContent>
            <CardFooter className="w-full flex justify-end">
              <Credenza>
                {value.length > 56 && (
                  <CredenzaTrigger
                    className={buttonVariants({
                      variant: "default",
                    })}
                  >
                    Créer le fichier
                  </CredenzaTrigger>
                )}
                <CredenzaContent className="max-md:space-y-3 max-md:mb-5 max-sm:px-3">
                  <CredenzaHeader>
                    <CredenzaTitle>Entrer le titre du fichier</CredenzaTitle>
                  </CredenzaHeader>
                  <Input
                    type="text"
                    placeholder="Tapez le titre du fichier"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {title && (
                    <p>
                      {statusTitle ===
                        "Le titre du fichier est déjà utilisé" && (
                        <span className="text-destructive text-sm font-medium">
                          {statusTitle}
                        </span>
                      )}
                      {statusTitle === "Le titre du fichier est disponible" && (
                        <span className="text-success text-sm font-medium">
                          {statusTitle}
                        </span>
                      )}
                      {statusTitle ===
                        "Le titre est en cours de vérification" && (
                        <span className="text-muted-foreground text-sm font-medium flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {statusTitle}
                        </span>
                      )}
                    </p>
                  )}
                  <Button
                    disabled={isTyping}
                    onClick={() =>
                      mutation.mutateAsync({
                        title,
                        folderId: props.folderId ?? "",
                        content: JSON.stringify(value),
                      })
                    }
                  >
                    Créer le fichier
                  </Button>
                </CredenzaContent>
              </Credenza>
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
                  url={fileUpload.url}
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
                      url: fileUpload.url,
                      size: fileUpload.size,
                      format: fileUpload.type,
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
          <ComponentDropZone setFiles={setFileUpload} />
        </CardContent>
        <div className="px-6">
          <PreviewPdf
            url={file.url as string}
            folderId={props.folderId ?? ""}
            fileId={props.fileId as string}
            fileTitle={file.title}
            viewBreadcrumb={false}
          />
        </div>
      </Card>
    );
  }
};
