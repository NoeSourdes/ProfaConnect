"use client";

import { PreviewPdf } from "@/src/components/dashboard/preview_file/preview-pdf";

import { PlateEditor } from "@/src/components/editor/plate-editor";
import { OpenAIProvider } from "@/src/components/editor/use-chat";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/src/components/ui/credenza";
import { Input } from "@/src/components/ui/input";
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
      const result = isCreate
        ? await createFile(values)
        : await updateFile({ id: props.fileId as string, data: values });

      if (!result) {
        throw new Error("Unexpected undefined result");
      }

      if (result.serverError || !result.data) {
        throw new Error(result.serverError || "An unknown error occurred");
      }

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getFiles", user?.user?.id ? user.user.id : ""],
      });
      isCreate
        ? toast.success("Le fichier a été créé avec succès")
        : toast.success("Le fichier a été modifié avec succès");
      if (redirect === "documents") {
        router.push(`/documents`);
      } else {
        router.push(`/documents/${redirect}`);
      }
      setTitle("");
    },
  });

  const mutationPDF = useMutation({
    mutationFn: async (values: fileTypePDF) => {
      const result = isCreate
        ? await createFilePDF(values)
        : await updateFilePdf({ id: props.fileId as string, data: values });

      if (!result) {
        throw new Error("Unexpected undefined result");
      }

      if (result.serverError || !result.data) {
        throw new Error(result.serverError || "An unknown error occurred");
      }

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getFiles", user?.user?.id ? user.user.id : ""],
      });
      isCreate
        ? toast.success("Le fichier a été créé avec succès")
        : toast.success("Le fichier a été modifié avec succès");
      if (redirect === "documents") {
        router.push(`/documents`);
      } else {
        router.push(`/documents/${redirect}`);
      }
      setTitle("");
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
      setStatusTitle("loading");
    }
    const timout = setTimeout(async () => {
      setIsTyping(false);
      const check = await checkTitleFileAction(title);
      if (check) {
        setStatusTitle("bad");
      } else {
        setStatusTitle("good");
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
            <CardContent className="w-full overflow-hidden rounded-lg p-0 min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
              <OpenAIProvider>
                <PlateEditor />
              </OpenAIProvider>

              <CardFooter className="w-full flex justify-end pt-[7px]">
                <Credenza>
                  <CredenzaTrigger
                    className={buttonVariants({
                      variant: "default",
                    })}
                  >
                    Créer le fichier
                  </CredenzaTrigger>

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
                        {statusTitle === "bad" && (
                          <span className="text-destructive text-sm font-medium">
                            Le titre du fichier est déjà utilisé
                          </span>
                        )}
                        {statusTitle === "good" && (
                          <span className="text-success text-sm font-medium">
                            Le titre du fichier est disponible
                          </span>
                        )}
                        {statusTitle === "loading" && (
                          <span className="text-muted-foreground text-sm font-medium flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Le titre est en cours de vérification
                          </span>
                        )}
                      </p>
                    )}
                    <Button
                      disabled={isTyping || statusTitle === "bad"}
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
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent className="h-full w-full" value="import">
          <Card className="h-full w-full flex flex-col p-0 shadow-none">
            <CardContent className="cursor-pointer min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] flex items-center justify-center">
              <ComponentDropZone setFiles={setFileUpload} />
            </CardContent>
            {fileUpload && Object.keys(fileUpload).length > 0 && (
              <>
                <div className="px-6">
                  <PreviewPdf
                    url={fileUpload.url}
                    folderId={props.folderId ?? ""}
                    fileId={props.fileId as string}
                    fileTitle={title}
                    viewBreadcrumb={false}
                  />
                </div>
                <CardFooter className="w-full flex justify-end pt-[7px]">
                  <Credenza>
                    <CredenzaTrigger
                      className={buttonVariants({
                        variant: "default",
                      })}
                    >
                      Créer le fichier
                    </CredenzaTrigger>

                    <CredenzaContent className="max-md:space-y-3 max-md:mb-5 max-sm:px-3">
                      <CredenzaHeader>
                        <CredenzaTitle>
                          Entrer le titre du fichier
                        </CredenzaTitle>
                      </CredenzaHeader>
                      <Input
                        type="text"
                        placeholder="Tapez le titre du fichier"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      {title && (
                        <p>
                          {statusTitle === "bad" && (
                            <span className="text-destructive text-sm font-medium">
                              Le titre du fichier est déjà utilisé
                            </span>
                          )}
                          {statusTitle === "good" && (
                            <span className="text-success text-sm font-medium">
                              Le titre du fichier est disponible
                            </span>
                          )}
                          {statusTitle === "loading" && (
                            <span className="text-muted-foreground text-sm font-medium flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Le titre est en cours de vérification
                            </span>
                          )}
                        </p>
                      )}
                      <Button
                        disabled={isTyping || statusTitle === "bad"}
                        onClick={() =>
                          mutationPDF.mutateAsync({
                            title: title,
                            folderId: props.folderId ?? "",
                            url: fileUpload.url,
                            size: fileUpload.size,
                            format: fileUpload.type,
                          })
                        }
                      >
                        Créer le fichier
                      </Button>
                    </CredenzaContent>
                  </Credenza>
                </CardFooter>
              </>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    );
  }
};
