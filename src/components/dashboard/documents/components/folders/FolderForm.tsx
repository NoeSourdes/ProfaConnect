"use client";

import { Button } from "@/src/components/ui/button";

import { Card, CardContent } from "@/src/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { useOpenModalFolder } from "@/src/hooks/documents/use-open-modal-folder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  checkTitleFolderAction,
  createFolderAction,
  updateFolderAction,
} from "../../../../../../actions/admin/folders/folder.actions";
import {
  CreateFolderType,
  createFolderSchema,
} from "../../../../../../actions/admin/folders/folder.schema";

export type FolderFormProps = {
  defaultValues?: CreateFolderType;
  folderId?: string;
};

export const FolderForm = (props: {
  defaultValues?: CreateFolderType;
  folderId?: string;
  inPopover?: boolean;
}) => {
  const form = useZodForm({
    schema: createFolderSchema,
    defaultValues: props.defaultValues,
  });
  const isCreate = !Boolean(props.defaultValues);
  const queryClient = useQueryClient();
  const { data: user } = useSession();
  const { show, toggleShow } = useOpenModalFolder();

  const mutation = useMutation({
    mutationFn: async (values: CreateFolderType) => {
      const checkTitle = await checkTitleFolderAction(values.title);
      if (checkTitle) {
        toast.error("Le titre du dossier est déjà utilisé");
        return;
      }
      const { data, serverError } = isCreate
        ? await createFolderAction(values)
        : await updateFolderAction({
            id: String(props.folderId),
            data: values,
          });

      if (serverError || !data) {
        throw new Error(serverError);
      }

      isCreate
        ? toast.success("Le dossier a été créé avec succès")
        : toast.success("Le dossier a été modifié avec succès");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["folders", user?.user?.id ? user.user.id : ""],
      });
      toggleShow && toggleShow(false);
    },
  });

  return (
    <>
      <Card className="border-none shadow-none">
        <CardContent className="p-0 shadow-none">
          <Form
            className="flex flex-col gap-4"
            form={form}
            onSubmit={async (values) => {
              await mutation.mutateAsync(values);
            }}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Entrez le titre du dossier"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Entrez la description du dossier"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2 justify-end w-full">
              <Button type="submit">
                {isCreate ? "Créer le dossier" : "Modifier le dossier"}
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
