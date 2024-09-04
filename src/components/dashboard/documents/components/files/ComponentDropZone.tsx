"use client";

import { Progress } from "@/src/components/ui/progress";
import { useUploadThing } from "@/src/utils/uploadthing";
import { FileText, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { toast } from "sonner";

interface ComponentDropZoneProps {
  setFiles: (files: string) => void;
}

export const ComponentDropZone = (props: ComponentDropZoneProps) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadeProgress, setUploadProgress] = useState<number>(0);

  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing("pdfUploader", {
    onClientUploadComplete: ([data]) => {
      startTransition(() => {
        props.setFiles(data.serverData.url);
        toast.success("Le fichier a été téléchargé avec succès");
      });
    },
    onUploadProgress: (progress) => {
      props.setFiles("");

      setUploadProgress(progress);
    },
  });

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);
    toast.error(
      `Le fichier ${file.file.name} n'est pas pris en charge. Veuillez télécharger un fichier PDF`
    );
  };
  const onDropAccepted = (acceptFiles: File[]) => {
    startUpload(acceptFiles, { configId: undefined });
    setIsDragOver(false);
  };

  const [isPending, startTransition] = useTransition();

  return (
    <Dropzone
      onDropRejected={onDropRejected}
      onDropAccepted={onDropAccepted}
      accept={{
        "application/pdf": [".pdf"],
      }}
      onDragEnter={() => setIsDragOver(true)}
      onDragLeave={() => setIsDragOver(false)}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          className=" w-full flex-1 flex flex-col items-center justify-center min-h-[calc(83vh-56px-64px-20px-24px-56px-48px)]"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragOver ? (
            <MousePointerSquareDashed className="h-6 w-6 mb-2 text-muted-foreground" />
          ) : isUploading || isPending ? (
            <Loader2 className="animate-spin h-6 w-6 mb-2 text-muted-foreground" />
          ) : (
            <FileText className="h-6 w-6 mb-2 text-muted-foreground" />
          )}
          <div className="flex-flex-col justify-center mb-2 text-sm text-muted-foreground">
            {isUploading ? (
              <div className=" flex flex-col items-center">
                <p> Téléchargement...</p>
                <Progress value={uploadeProgress} className="mt-2 w-40 h-2" />
              </div>
            ) : isPending ? (
              <div className="flex flex-col items-center ">
                <p>Affichage du pdf, attendez SVP...</p>
              </div>
            ) : isDragOver ? (
              <p>
                <span className="font-semibold text-primary">
                  Déposez le fichier ici{" "}
                </span>
                pour le télécharger
              </p>
            ) : (
              <p>
                <span className="font-semibold text-primary">Cliquez ici</span>{" "}
                ou glissez et déposez un fichier
              </p>
            )}
          </div>
          {isPending ? null : (
            <p className="text-xs text-muted-foreground">
              Fichier supporté: <span className="font-medium">.pdf</span>
            </p>
          )}
        </div>
      )}
    </Dropzone>
  );
};
