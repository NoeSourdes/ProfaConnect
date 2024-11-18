"use client";

import { getUserFiles } from "@/actions/admin/files/file.action";
import { fileTypeGlobal } from "@/actions/admin/files/file.schema";
import { useViewSelect } from "@/actions/admin/folders/viewSelect.store";
import IsErrorComponent from "@/src/components/dashboard/documents/isError-component";
import IsLoadingComponent from "@/src/components/dashboard/documents/isLoading-component";
import IsSuccessComponent from "@/src/components/dashboard/documents/isSuccess-component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  deleteFolderAction,
  getUserFolders,
} from "../../../actions/admin/folders/folder.actions";

export default function Documents() {
  const { data: user } = useSession();
  const queryClient = useQueryClient();

  const { view } = useViewSelect();

  const {
    data: folders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["folders", user?.user?.id ? user.user.id : ""],
    queryFn: async () => {
      const folders = await getUserFolders(user?.user?.id ? user.user.id : "");
      return folders.map((folder) => ({
        ...folder,
        published: folder.published ?? false,
      }));
    },
  });

  const {
    data: files,
    isError: Errorfile,
    isLoading: Loadingfile,
  } = useQuery({
    queryKey: ["getFiles", user?.user?.id ? user.user.id : ""],
    queryFn: async () => {
      const files = await getUserFiles(user?.user?.id ? user.user.id : "");
      return files;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (idFolder: { id: string }) => {
      const result = await deleteFolderAction(idFolder.id);
      if (!result) {
        throw new Error("Action result is undefined");
      }
      if (result.serverError || !result.data) {
        throw new Error(result.serverError || "Unknown error occurred");
      }

      return result.data;
    },
    onSuccess: () => {
      toast.success("Le dossier a été supprimé avec succès");

      queryClient.invalidateQueries({
        queryKey: ["folders", user?.user?.id ? user.user.id : ""],
      });
    },
  });

  if (isLoading) {
    return <IsLoadingComponent />;
  }

  if (isError) {
    return <IsErrorComponent />;
  }

  if (Errorfile) {
    return <IsErrorComponent />;
  }

  if (Loadingfile) {
    return <IsLoadingComponent />;
  }

  return (
    <IsSuccessComponent
      files={files as fileTypeGlobal[]}
      folders={folders}
      user={user}
      deleteMutation={deleteMutation}
      view={view}
    />
  );
}
