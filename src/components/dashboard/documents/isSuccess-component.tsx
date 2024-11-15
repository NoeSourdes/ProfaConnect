"use client";

import { fileTypeGlobal } from "@/actions/admin/files/file.schema";
import { FolderType } from "@/actions/admin/folders/folder.schema";
import { useGetInfo } from "@/src/hooks/documents/use-get-info";
import { useGetTreeView } from "@/src/hooks/documents/use-get-tree-view";
import { useSearchDocuments } from "@/src/hooks/documents/use-search-documents";
import { useSelectedDocuments } from "@/src/hooks/documents/use-selected-documents";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { EmptyState } from "./components/isSuccesseComponent/EmptyState";
import { FileList } from "./components/isSuccesseComponent/FileList";
import { FiltersAndSelectedSection } from "./components/isSuccesseComponent/FiltersAndSelectedSection";
import { FolderList } from "./components/isSuccesseComponent/FolderList";
import { NoResults } from "./components/isSuccesseComponent/NoResults";
import TableView from "./components/isSuccesseComponent/TableView";

interface IsSuccessComponentProps {
  folders: any;
  files: fileTypeGlobal[];
  user: any;
  deleteMutation: any;
  view: any;
}

export default function IsSuccessComponent({
  folders,
  files,
  user,
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

  const variants = {
    open: {
      opacity: 1,
      display: "flex",
      alignItems: "center",
      zIndex: 1000,
    },
    closed: {
      opacity: 0,
      display: "flex",
      alignItems: "center",
    },
  };

  const [valueType, setValueType] = React.useState<string>("");
  const [valueDate, setValueDate] = React.useState<string>("");

  return (
    <div
      className={`h-full w-full ${isOpenModalTreeView ? "pl-5" : ""} ${
        isOpenModalInfo ? "pr-5" : ""
      }`}
    >
      {folders?.length === 0 && files?.length === 0 ? (
        <>
          <EmptyState />
        </>
      ) : (
        <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
          <div className="h-full w-full">
            <div className="w-full flex flex-wrap">
              {folders?.filter((folder: FolderType) =>
                folder.title.toLowerCase().includes(search?.toLowerCase() ?? "")
              ).length === 0 &&
                files?.filter((file: fileTypeGlobal) =>
                  file.title.toLowerCase().includes(search?.toLowerCase() ?? "")
                ).length === 0 && <NoResults />}
              <div className={`w-full space-y-5 `}>
                {/* bloc filter and selected documents */}

                {view === "grid_view" ? (
                  <div className="space-y-5">
                    {folders?.filter((folder: FolderType) =>
                      folder.title
                        .toLowerCase()
                        .includes(search?.toLowerCase() ?? "")
                    ).length !== 0 && (
                      <>
                        <FiltersAndSelectedSection
                          selectedDocuments={selectedDocuments}
                          setSelectedDocuments={setSelectedDocuments}
                          variants={variants}
                          valueType={valueType}
                          valueDate={valueDate}
                          setValueType={setValueType}
                          setValueDate={setValueDate}
                          folders={folders}
                        />
                        <FolderList
                          folders={folders}
                          search={search}
                          selectedDocuments={selectedDocuments}
                          setSelectedDocuments={setSelectedDocuments}
                          router={router}
                          user={user}
                        />
                      </>
                    )}
                    {files?.filter((file: fileTypeGlobal) =>
                      file.title
                        .toLowerCase()
                        .includes(search?.toLowerCase() ?? "")
                    ).length !== 0 && (
                      <FileList
                        files={files}
                        folders={folders}
                        search={search}
                        selectedDocuments={selectedDocuments}
                        setSelectedDocuments={setSelectedDocuments}
                        user={user}
                      />
                    )}
                  </div>
                ) : (
                  <TableView
                    folders={folders}
                    search={search}
                    user={user}
                    files={files}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
