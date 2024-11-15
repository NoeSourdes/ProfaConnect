import { fileTypeGlobal } from "@/actions/admin/files/file.schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { EllipsisVertical, File, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { PopoverActionFile } from "../../../files/PopoverActionFile";
interface FileListProps {
  files: fileTypeGlobal[];
  folders: any;
  search: string;
  selectedDocuments: fileTypeGlobal[];
  setSelectedDocuments: (documents: fileTypeGlobal[]) => void;
  user: any;
}

export const FileList: React.FC<FileListProps> = ({
  files,
  search,
  selectedDocuments,
  setSelectedDocuments,
  user,
  folders,
}) => (
  <div className={`relative flex flex-col gap-3`}>
    <h6 className="text-sm">fichiers</h6>
    <div className="w-full flex flex-wrap gap-4">
      {files
        ?.filter((file: fileTypeGlobal) =>
          file.title.toLowerCase().includes(search?.toLowerCase() ?? "")
        )
        .map((file: fileTypeGlobal) => (
          <div
            key={file.fileId}
            className={`relative bg-background dark:bg-secondary z-50 w-48 max-w-64 p-4 grow flex flex-col justify-between border rounded-lg  hover:ring-2 ring-primary/70 cursor-pointer transition-all folder-item ${
              selectedDocuments.includes(file) && "ring-2 ring-primary"
            }`}
            onDoubleClick={() => {
              window.open(file.url ?? "");
              setSelectedDocuments([]);
            }}
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = folders.indexOf(file);

              if (e.shiftKey) {
                const lastSelectedIndex = folders.indexOf(
                  selectedDocuments[selectedDocuments.length - 1]
                );

                if (lastSelectedIndex === -1) {
                  setSelectedDocuments([file]);
                } else {
                  const startIndex = Math.min(lastSelectedIndex, currentIndex);
                  const endIndex = Math.max(lastSelectedIndex, currentIndex);
                  const filesToSelect = folders.slice(startIndex, endIndex + 1);

                  setSelectedDocuments([...filesToSelect]);
                }
              } else if (e.metaKey || e.ctrlKey) {
                setSelectedDocuments(
                  selectedDocuments.includes(file)
                    ? selectedDocuments.filter((doc) => doc !== file)
                    : [...selectedDocuments, file]
                );
              } else {
                setSelectedDocuments([file]);
              }
            }}
          >
            <div className="w-full space-y-5">
              <div className="w-full flex items-center justify-between">
                <Star size={18} />
                <Popover>
                  <PopoverTrigger asChild>
                    <EllipsisVertical size={18} className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col w-52 mr-10 sm:mr-16 lg:mr-28 rounded-[6px] p-2">
                    <PopoverActionFile file={file} user={user} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className=" flex flex-col items-center justify-center gap-3">
                <div className="relative">
                  <File
                    size={50}
                    strokeWidth={1}
                    className="text-muted-foreground"
                  />
                  {file.format === "pdf" ? (
                    <Image
                      src="/svg/PDF_file_icon.svg"
                      alt="svg logo pdf"
                      height={40}
                      width={40}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  ) : (
                    <span className="text-sm text-primary font-medium absolute top-5 left-1/2 transform -translate-x-1/2">
                      TXT
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-center">
                  {file.title}.{file.format}
                </h3>
              </div>
              <div className="h-[1px] w-full bg-border rounded"></div>
              <div className="w-full flex items-center justify-between">
                <p className="text-xs">
                  <span className="font-semibold">taille du fichier :</span>{" "}
                  <br />{" "}
                  <span className="text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(1)} MB
                  </span>
                </p>
                <Image
                  src={user.user.image ? user.user.image : "/user.png"}
                  alt="user image"
                  width={30}
                  height={30}
                  className="rounded-md border-2"
                />
              </div>
            </div>
          </div>
        ))}{" "}
    </div>
  </div>
);
