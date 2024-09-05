"use client";

import { FolderType } from "@/actions/admin/folders/folder.schema";
import { useGetInfo } from "@/src/hooks/documents/use-get-info";
import { useGetTreeView } from "@/src/hooks/documents/use-get-tree-view";
import { useSearchDocuments } from "@/src/hooks/documents/use-search-documents";
import { useSelectedDocuments } from "@/src/hooks/documents/use-selected-documents";
import { EllipsisVertical, Folder, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { PopoverActionFile } from "../files/PopoverActionFile";
import { PopoverActionFolder } from "./PopoverActionFolder";
import { ButtonCreateFolder } from "./components/folders/ButtonCreateFolder";

interface IsSuccessComponentProps {
  folders: any;
  files: any;
  user: any;
  deleteMutation: any;
  view: any;
}

export default function IsSuccessComponent({
  folders,
  files,
  user,
  deleteMutation,
  view,
}: IsSuccessComponentProps) {
  const router = useRouter();

  const { searchZustand: search } = useSearchDocuments();
  const { selectedDocuments, setSelectedDocuments } = useSelectedDocuments();

  const { isOpenModalTreeView } = useGetTreeView();
  const { isOpenModalInfo } = useGetInfo();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".folder-item")) {
        setSelectedDocuments([]);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [setSelectedDocuments]);

  return (
    <div
      className={`h-full w-full ${isOpenModalTreeView ? "pl-5" : ""} ${
        isOpenModalInfo ? "pr-5" : ""
      }`}
    >
      {folders?.length === 0 ? (
        <>
          <Card className="rounded-lg shadow-none border-dashed">
            <CardContent className=" bg-transparent flex items-center justify-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
              <div className="flex flex-col relative">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Vous n'avez pas de documents
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Créez votre premier document
                  </p>
                  <div className="flex items-center gap-5">
                    <ButtonCreateFolder />
                    <Link href="/documents/new_file">
                      <Button className="mt-4">Créer une fichier</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
          <div className="h-full w-full">
            <div className="w-full flex flex-wrap">
              {folders?.filter((folder: FolderType) =>
                folder.title.toLowerCase().includes(search?.toLowerCase() ?? "")
              ).length === 0 && (
                <Card className="rounded-lg shadow-none border-dashed w-full">
                  <CardContent className=" bg-transparent flex items-center justify-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                    <div className="flex flex-col relative">
                      <div className="flex flex-col relative">
                        <div className="flex flex-col items-center gap-1 text-center">
                          <h3 className="text-2xl font-bold tracking-tight">
                            Aucun résultat trouvé
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Aucun document ne correspond à votre recherche.
                            Veuillez réessayer avec un autre mot-clé.
                          </p>
                          <div className="flex items-center gap-5">
                            <ButtonCreateFolder />
                            <Link href="/documents/new_file">
                              <Button className="mt-4">
                                Créer une fichier
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              <div
                className={`w-full ${
                  selectedDocuments.length > 0 ? "space-y-5" : ""
                }`}
              >
                <div
                  className={`flex w-full rounded-lg items-center gap-3 transition-all ${
                    selectedDocuments.length > 0
                      ? "border px-4 py-2 visible"
                      : "h-0 invisible"
                  }`}
                >
                  <Button
                    variant="ghost"
                    size="icon_sm"
                    className={` ${
                      selectedDocuments.length > 0 ? "opacity-1" : "opacity-0"
                    }`}
                  >
                    <X
                      size={18}
                      className={`"text-muted-foreground cursor-pointer"`}
                      onClick={() => {
                        setSelectedDocuments([]);
                      }}
                    />
                  </Button>
                  <span
                    className={`text-muted-foreground text-sm ${
                      selectedDocuments.length > 0 ? "opacity-1" : "opacity-0"
                    }`}
                  >
                    {selectedDocuments.length} {""}
                    élément{selectedDocuments.length > 1 ? "s" : ""} sélectionné
                    {selectedDocuments.length > 1 ? "s" : ""} sur{" "}
                    {folders?.length}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon_sm"
                    className={` ${
                      selectedDocuments.length > 0 ? "opacity-1" : "opacity-0"
                    }`}
                  >
                    <EllipsisVertical
                      size={18}
                      className={`"cursor-pointer"`}
                    />
                  </Button>
                </div>
                {view === "grid_view" ? (
                  <div className="space-y-5">
                    {folders?.filter((folder: FolderType) =>
                      folder.title
                        .toLowerCase()
                        .includes(search?.toLowerCase() ?? "")
                    ).length !== 0 && (
                      <div className={`relative flex flex-col gap-3`}>
                        <h6 className="text-sm">Dossiers</h6>
                        <div className="w-full flex flex-wrap gap-4">
                          {folders
                            ?.filter((folder: FolderType) =>
                              folder.title
                                .toLowerCase()
                                .includes(search?.toLowerCase() ?? "")
                            )
                            .map((folder: FolderType) => (
                              <div
                                key={folder.id}
                                className={`relative bg-background z-50 w-48 max-w-64 px-4 py-2 grow flex flex-col justify-between border rounded-lg  hover:ring-2 ring-primary/70 cursor-pointer transition-all folder-item ${
                                  selectedDocuments.includes(folder) &&
                                  "ring-2 ring-primary"
                                }`}
                                onDoubleClick={() => {
                                  router.push(`/documents/${folder.id}`);
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const currentIndex = folders.indexOf(folder);

                                  if (e.shiftKey) {
                                    const lastSelectedIndex = folders.indexOf(
                                      selectedDocuments[
                                        selectedDocuments.length - 1
                                      ]
                                    );

                                    if (lastSelectedIndex === -1) {
                                      setSelectedDocuments([folder]);
                                    } else {
                                      const startIndex = Math.min(
                                        lastSelectedIndex,
                                        currentIndex
                                      );
                                      const endIndex = Math.max(
                                        lastSelectedIndex,
                                        currentIndex
                                      );
                                      const filesToSelect = folders.slice(
                                        startIndex,
                                        endIndex + 1
                                      );

                                      setSelectedDocuments([...filesToSelect]);
                                    }
                                  } else if (e.metaKey || e.ctrlKey) {
                                    setSelectedDocuments(
                                      selectedDocuments.includes(folder)
                                        ? selectedDocuments.filter(
                                            (doc) => doc !== folder
                                          )
                                        : [...selectedDocuments, folder]
                                    );
                                  } else {
                                    setSelectedDocuments([folder]);
                                  }
                                }}
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <div className="relative">
                                        <span className="absolute w-2 h-[2px] rounded bg-white bottom-[6px] left-[5px]"></span>
                                        <Folder
                                          fill="#2463EB"
                                          size={25}
                                          className="text-primary"
                                        />
                                      </div>
                                      <h2 className="text-lg font-semibold">
                                        {folder.title.length > 20
                                          ? folder.title.slice(0, 20) + "..."
                                          : folder.title}
                                      </h2>
                                    </div>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <EllipsisVertical
                                          size={18}
                                          className="cursor-pointer"
                                        />
                                      </PopoverTrigger>
                                      <PopoverContent className="flex flex-col w-52 mr-10 sm:mr-16 lg:mr-28 rounded-[6px] p-2">
                                        <PopoverActionFolder
                                          folder={folder}
                                          user={user}
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {folder.description ?? "".length > 80
                                      ? folder.description ??
                                        "".slice(0, 80) + "..."
                                      : folder.description}
                                  </p>
                                </div>
                              </div>
                            ))}{" "}
                        </div>
                      </div>
                    )}
                    {files?.filter((file: FolderType) =>
                      file.title
                        .toLowerCase()
                        .includes(search?.toLowerCase() ?? "")
                    ).length !== 0 && (
                      <div className={`relative flex flex-col gap-3`}>
                        <h6 className="text-sm">fichiers</h6>
                        <div className="w-full flex flex-wrap gap-4">
                          {files
                            ?.filter((file: FolderType) =>
                              file.title
                                .toLowerCase()
                                .includes(search?.toLowerCase() ?? "")
                            )
                            .map((file: FolderType) => (
                              <div
                                key={file.id}
                                className={`relative bg-background z-50 w-48 max-w-64 px-4 py-2 grow flex flex-col justify-between border rounded-lg  hover:ring-2 ring-primary/70 cursor-pointer transition-all folder-item ${
                                  selectedDocuments.includes(file) &&
                                  "ring-2 ring-primary"
                                }`}
                                onDoubleClick={() => {
                                  // router.push(file.url ? file.url : "");
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const currentIndex = folders.indexOf(file);

                                  if (e.shiftKey) {
                                    const lastSelectedIndex = folders.indexOf(
                                      selectedDocuments[
                                        selectedDocuments.length - 1
                                      ]
                                    );

                                    if (lastSelectedIndex === -1) {
                                      setSelectedDocuments([file]);
                                    } else {
                                      const startIndex = Math.min(
                                        lastSelectedIndex,
                                        currentIndex
                                      );
                                      const endIndex = Math.max(
                                        lastSelectedIndex,
                                        currentIndex
                                      );
                                      const filesToSelect = folders.slice(
                                        startIndex,
                                        endIndex + 1
                                      );

                                      setSelectedDocuments([...filesToSelect]);
                                    }
                                  } else if (e.metaKey || e.ctrlKey) {
                                    setSelectedDocuments(
                                      selectedDocuments.includes(file)
                                        ? selectedDocuments.filter(
                                            (doc) => doc !== file
                                          )
                                        : [...selectedDocuments, file]
                                    );
                                  } else {
                                    setSelectedDocuments([file]);
                                  }
                                }}
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <div className="relative">
                                        <span className="absolute w-2 h-[2px] rounded bg-white bottom-[6px] left-[5px]"></span>
                                        <Folder
                                          fill="#2463EB"
                                          size={25}
                                          className="text-primary"
                                        />
                                      </div>
                                      <h2 className="text-lg font-semibold">
                                        {file.title.length > 20
                                          ? file.title.slice(0, 20) + "..."
                                          : file.title}
                                      </h2>
                                    </div>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <EllipsisVertical
                                          size={18}
                                          className="cursor-pointer"
                                        />
                                      </PopoverTrigger>
                                      <PopoverContent className="flex flex-col w-52 mr-10 sm:mr-16 lg:mr-28 rounded-[6px] p-2">
                                        <PopoverActionFile
                                          file={file}
                                          user={user}
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {file.description ?? "".length > 80
                                      ? file.description ??
                                        "".slice(0, 80) + "..."
                                      : file.description}
                                  </p>
                                </div>
                              </div>
                            ))}{" "}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full">
                    <Table className="w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="max-sm:text-xs">Nom</TableHead>
                          <TableHead className="max-sm:text-xs">
                            Propriétaire
                          </TableHead>
                          <TableHead className="max-sm:text-xs">
                            Dernière modification
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      {folders
                        ?.filter((folder: FolderType) =>
                          folder.title
                            .toLowerCase()
                            .includes(search?.toLowerCase() ?? "")
                        )
                        .map((folder: FolderType) => (
                          <TableBody className="max-sm:text-xs" key={folder.id}>
                            <TableRow>
                              <TableCell>
                                <Link href={`/documents/${folder.id}`}>
                                  <span className="text-primary">
                                    {folder.title.length > 20
                                      ? folder.title.slice(0, 20) + "..."
                                      : folder.title}
                                  </span>
                                </Link>
                              </TableCell>
                              <TableCell className="flex items-center gap-1 text-muted-foreground">
                                <Image
                                  src={
                                    folder.author?.image
                                      ? folder.author.image
                                      : "/user.png"
                                  }
                                  alt={"user image"}
                                  width={20}
                                  height={20}
                                  className="rounded-full"
                                />

                                {folder.author?.id === user?.user?.id
                                  ? "Moi"
                                  : folder.author?.name}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {new Date(folder.updatedAt).toLocaleDateString(
                                  "fr-FR",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </TableCell>
                              <TableCell>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <EllipsisVertical
                                      size={18}
                                      className="cursor-pointer"
                                    />
                                  </PopoverTrigger>
                                  <PopoverContent className="flex flex-col w-52 mr-10 sm:mr-16 lg:mr-28 rounded-[6px] p-2">
                                    <PopoverActionFolder
                                      folder={folder}
                                      user={user}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        ))}
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
