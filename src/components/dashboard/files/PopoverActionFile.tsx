"use client";

import {
  deleteFileAction,
  renameFileAction,
} from "@/actions/admin/files/file.action";
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/src/components/expenssion/modal-responsive";
import { Input } from "@/src/components/ui/input";
import { useSelectedDocuments } from "@/src/hooks/documents/use-selected-documents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, FolderPen, Loader2, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";

export type PopoverActionFileProps = {
  file: any;
  user: any;
};

export const PopoverActionFile = (props: PopoverActionFileProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [newNameFolder, setNewNameFolder] = useState("");
  const [open, setOpen] = useState(false);
  const { setSelectedDocuments } = useSelectedDocuments();

  const deleteMutation = useMutation({
    mutationFn: (idFile: { id: string }) => deleteFileAction(idFile.id),
    onSuccess: ({ data, serverError }) => {
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("La fichier a été supprimée avec succès");

      queryClient.invalidateQueries({
        queryKey: ["getFiles", props.user?.user?.id ? props.user.user.id : ""],
      });
    },
  });

  const { mutate: mutationupdateNameFile, isPending } = useMutation({
    mutationFn: (data: { id: string; name: string }) =>
      renameFileAction({ id: data.id, name: data.name }),
    onSuccess: ({ data, serverError }) => {
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("La fichier a été renommée avec succès");
      setOpen(false);

      queryClient.invalidateQueries({
        queryKey: ["folders", props.user?.user?.id ? props.user.user.id : ""],
      });
      setSelectedDocuments([]);
    },
  });

  return (
    <>
      {[
        {
          icon: <ExternalLink size={18} />,
          text: "Ouvrir le fichier",
          action: () => {
            router.push(props.file.url ? props.file.url : "");
          },
          name: "open",
        },
        {
          icon: <FolderPen size={18} />,
          text: "Renommer",
          action: null,
          name: "rename",
        },
        {
          icon: <Pen size={18} />,
          text: "Modifier",
          action: () => {
            router.push(`#`);
          },
          name: "edit",
        },
        {
          icon: <Trash size={18} />,
          text: "Supprimer le fichier",
          action: () => {
            deleteMutation.mutate({ id: props.file.fileId });
          },
          name: "delete",
        },
      ].map((button, index) => (
        <ResponsiveModal open={open} onOpenChange={setOpen} key={index}>
          {button.name === "rename" ? (
            <ResponsiveModalTrigger asChild>
              <Button
                className={`flex justify-start items-center gap-2 pl-2 rounded`}
                variant="ghost"
                onClick={() => {
                  setOpen(true);
                }}
              >
                {button.icon}
                {button.text}
              </Button>
            </ResponsiveModalTrigger>
          ) : (
            <Button
              className={`flex justify-start items-center gap-2 pl-2 rounded transition-all ${
                button.name === "delete" ? "hover:text-destructive" : ""
              }`}
              variant="ghost"
              onClick={() => {
                if (button.action) {
                  button.action();
                }
              }}
            >
              {button.icon}
              {button.text}
            </Button>
          )}
          {button.text === "Renommer" && (
            <ResponsiveModalContent className="p-6 shadow-lg">
              <div className="flex flex-col gap-4">
                <ResponsiveModalHeader>
                  <ResponsiveModalTitle>
                    Renommer le fichier
                  </ResponsiveModalTitle>
                </ResponsiveModalHeader>

                <Input
                  id="name"
                  defaultValue={props.file.title}
                  className="col-span-3"
                  onChange={(e) => {
                    setNewNameFolder(e.target.value);
                  }}
                />

                <ResponsiveModalFooter>
                  <ResponsiveModalClose>
                    <Button variant="ghost">Annuler</Button>
                  </ResponsiveModalClose>
                  <Button
                    disabled={isPending}
                    onClick={() => {
                      mutationupdateNameFile({
                        id: props.file.fileId,
                        name: newNameFolder,
                      });
                    }}
                    type="submit"
                  >
                    {isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Renommer
                  </Button>
                </ResponsiveModalFooter>
              </div>
            </ResponsiveModalContent>
          )}
        </ResponsiveModal>
      ))}
    </>
  );
};
