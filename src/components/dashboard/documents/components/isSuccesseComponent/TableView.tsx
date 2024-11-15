import { fileTypeGlobal } from "@/actions/admin/files/file.schema";
import { FolderType } from "@/actions/admin/folders/folder.schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PopoverActionFile } from "../../../files/PopoverActionFile";
import { PopoverActionFolder } from "../../PopoverActionFolder";

interface TableViewProps {
  folders: any;
  files: fileTypeGlobal[];
  search: string;
  user: any;
}

const TableView: React.FC<TableViewProps> = ({
  folders,
  search,
  user,
  files,
}) => (
  <div className="w-full flex flex-col gap-5">
    <div>
      <p className="text-sm mb-2">Dossiers</p>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="max-sm:text-xs">Nom</TableHead>
            <TableHead className="max-sm:text-xs">Propriétaire</TableHead>
            <TableHead className="max-sm:text-xs">
              Dernière modification
            </TableHead>
          </TableRow>
        </TableHeader>
        {folders
          ?.filter((folder: FolderType) =>
            folder.title.toLowerCase().includes(search?.toLowerCase() ?? "")
          )
          .map((folder: FolderType) => (
            <TableBody className="max-sm:text-xs" key={folder.id}>
              <TableRow>
                <TableCell className="w-48">
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
                      folder.author?.image ? folder.author.image : "/user.png"
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
                  {new Date(folder.updatedAt).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <EllipsisVertical size={18} className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col w-52 mr-10 sm:mr-16 lg:mr-28 rounded-[6px] p-2">
                      <PopoverActionFolder folder={folder} user={user} />
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
      </Table>
    </div>
    <div>
      <p className="text-sm mb-2">Fichiers</p>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="max-sm:text-xs">Nom</TableHead>
            <TableHead className="max-sm:text-xs">Propriétaire</TableHead>
            <TableHead className="max-sm:text-xs">
              Dernière modification
            </TableHead>
          </TableRow>
        </TableHeader>
        {files
          ?.filter((file: fileTypeGlobal) =>
            file.title.toLowerCase().includes(search?.toLowerCase() ?? "")
          )
          .map((file: fileTypeGlobal) => (
            <TableBody className="max-sm:text-xs" key={file.fileId}>
              <TableRow>
                <TableCell className="w-48">
                  <Link href={`/documents/${file.fileId}`}>
                    <span className="text-primary">
                      {file.title.length > 20
                        ? file.title.slice(0, 20) + "..."
                        : file.title}
                    </span>
                  </Link>
                </TableCell>
                <TableCell className="flex items-center gap-1 text-muted-foreground">
                  <Image
                    src={file.author?.image ? file.author.image : "/user.png"}
                    alt={"user image"}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />

                  {file.author?.id === user?.user?.id
                    ? "Moi"
                    : file.author?.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {file.updatedAt &&
                    new Date(file.updatedAt).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <EllipsisVertical size={18} className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col w-52 mr-10 sm:mr-16 lg:mr-28 rounded-[6px] p-2">
                      <PopoverActionFile file={file} user={user} />
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
      </Table>
    </div>
  </div>
);

export default TableView;
