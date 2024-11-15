import { FolderType } from "@/actions/admin/folders/folder.schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { EllipsisVertical, Folder } from "lucide-react";
import { useRouter } from "next/navigation";
import { PopoverActionFolder } from "../../PopoverActionFolder";

interface FolderListProps {
  folders: FolderType[];
  search: string;
  selectedDocuments: FolderType[];
  setSelectedDocuments: (documents: FolderType[]) => void;
  router: ReturnType<typeof useRouter>;
  user: any;
}

export const FolderList = ({
  folders,
  search,
  selectedDocuments,
  setSelectedDocuments,
  router,
  user,
}: FolderListProps) => (
  <div className={`relative flex flex-col gap-3`}>
    <h6 className="text-sm">Dossiers</h6>
    <div className="w-full flex flex-wrap gap-4">
      {folders
        ?.filter((folder: FolderType) =>
          folder.title.toLowerCase().includes(search?.toLowerCase() ?? "")
        )
        .map((folder: FolderType) => (
          <div
            key={folder.id}
            className={`relative bg-background dark:bg-secondary z-50 w-48 max-w-64 px-4 py-2 grow flex flex-col justify-between border rounded-lg  hover:ring-2 ring-primary/70 cursor-pointer transition-all folder-item ${
              selectedDocuments.includes(folder) && "ring-2 ring-primary"
            }`}
            onDoubleClick={() => {
              router.push(`/documents/${folder.id}`);
              setSelectedDocuments([]);
            }}
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = folders.indexOf(folder);

              if (e.shiftKey) {
                const lastSelectedIndex = folders.indexOf(
                  selectedDocuments[selectedDocuments.length - 1]
                );

                if (lastSelectedIndex === -1) {
                  setSelectedDocuments([folder]);
                } else {
                  const startIndex = Math.min(lastSelectedIndex, currentIndex);
                  const endIndex = Math.max(lastSelectedIndex, currentIndex);
                  const filesToSelect = folders.slice(startIndex, endIndex + 1);

                  setSelectedDocuments([...filesToSelect]);
                }
              } else if (e.metaKey || e.ctrlKey) {
                setSelectedDocuments(
                  selectedDocuments.includes(folder)
                    ? selectedDocuments.filter((doc) => doc !== folder)
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
                    <Folder fill="#2463EB" size={25} className="text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold">
                    {folder.title.length > 20
                      ? folder.title.slice(0, 20) + "..."
                      : folder.title}
                  </h2>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <EllipsisVertical size={18} className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col w-52 mr-10 sm:mr-16 lg:mr-28 rounded-[6px] p-2">
                    <PopoverActionFolder folder={folder} user={user} />
                  </PopoverContent>
                </Popover>
              </div>
              <p className="text-sm text-muted-foreground">
                {folder.description ?? "".length > 80
                  ? folder.description ?? "".slice(0, 80) + "..."
                  : folder.description}
              </p>
            </div>
          </div>
        ))}{" "}
    </div>
  </div>
);
