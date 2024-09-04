"use client";

import {
  deleteFolderAction,
  renameFolderAction,
} from "@/actions/admin/folders/folder.actions";
import { FolderType } from "@/actions/admin/folders/folder.schema";
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/src/components/ui/credenza";
import { Input } from "@/src/components/ui/input";
import { useSelectedDocuments } from "@/src/hooks/documents/use-selected-documents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, FolderPen, Loader2, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";

export type PopoverActionFolderProps = {
  folder: FolderType;
  user: any;
};

export const PopoverActionFolder = (props: PopoverActionFolderProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [newNameFolder, setNewNameFolder] = useState("");
  const [open, setOpen] = useState(false);
  const { setSelectedDocuments } = useSelectedDocuments();

  const deleteMutation = useMutation({
    mutationFn: (idFolder: { id: string }) => deleteFolderAction(idFolder.id),
    onSuccess: ({ data, serverError }) => {
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("Le dossier a été supprimé avec succès");

      queryClient.invalidateQueries({
        queryKey: ["folders", props.user?.user?.id ? props.user.user.id : ""],
      });
      setSelectedDocuments([]);
    },
  });

  const { mutate: mutationupdateNameFolder, isPending } = useMutation({
    mutationFn: (data: { id: string; name: string }) =>
      renameFolderAction({ id: data.id, name: data.name }),
    onSuccess: ({ data, serverError }) => {
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("Le dossier a été renommé avec succès");
      setOpen(false);

      queryClient.invalidateQueries({
        queryKey: ["folders", props.user?.user?.id ? props.user.user.id : ""],
      });
    },
  });

  return (
    <>
      {[
        {
          icon: <ExternalLink size={18} />,
          text: "Ouvrir le dossier",
          action: () => {
            router.push(`/documents/${props.folder.id}`);
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
            router.push(`/documents/${props.folder.id}/edit`);
          },
          name: "edit",
        },
        {
          icon: <Trash size={18} />,
          text: "Supprimer le dossier",
          action: () => {
            deleteMutation.mutate({ id: props.folder.id });
          },
          name: "delete",
        },
      ].map((button, index) => (
        <Credenza open={open} onOpenChange={setOpen} key={index}>
          {button.name === "rename" ? (
            <CredenzaTrigger asChild>
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
            </CredenzaTrigger>
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
            <CredenzaContent className="p-6 shadow-lg">
              <div className="flex flex-col gap-4">
                <CredenzaHeader>
                  <CredenzaTitle>Renommer le dossier</CredenzaTitle>
                </CredenzaHeader>

                <Input
                  id="name"
                  defaultValue={props.folder.title}
                  className="col-span-3"
                  onChange={(e) => {
                    setNewNameFolder(e.target.value);
                  }}
                />

                <CredenzaFooter>
                  <CredenzaClose>
                    <Button variant="ghost" className="max-lg:w-full">
                      Annuler
                    </Button>
                  </CredenzaClose>
                  <Button
                    disabled={isPending}
                    onClick={() => {
                      mutationupdateNameFolder({
                        id: props.folder.id,
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
                </CredenzaFooter>
              </div>
            </CredenzaContent>
          )}
        </Credenza>
      ))}
    </>
  );
};
