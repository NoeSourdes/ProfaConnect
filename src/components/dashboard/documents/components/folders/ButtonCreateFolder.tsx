"use client";

import { Button, buttonVariants } from "@/src/components/ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/src/components/ui/credenza";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { useOpenModalFolder } from "@/src/hooks/documents/use-open-modal-folder";
import { FolderOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { CreateFolderType } from "../../../../../../actions/admin/folders/folder.schema";
import { FolderForm } from "./FolderForm";

export type FolderFormProps = {
  defaultValues?: CreateFolderType;
  folderId?: string;
};

export const ButtonCreateFolder = (props: {
  defaultValues?: CreateFolderType;
  folderId?: string;
  buttonInTop?: boolean;
}) => {
  const pathname = usePathname();
  const lastSlashIndex = pathname.lastIndexOf("/");
  let newPathname = "";
  if (lastSlashIndex === 0) {
    newPathname = pathname;
  } else {
    newPathname = pathname.substring(0, lastSlashIndex) + "/";
  }

  const { show, toggleShow } = useOpenModalFolder();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "u" && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        toggleShow(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Credenza open={show} onOpenChange={toggleShow}>
        <CredenzaTrigger asChild>
          {props.buttonInTop ? (
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger
                  onClick={() => toggleShow(true)}
                  className={buttonVariants({
                    variant: "outline",
                  })}
                >
                  <div className="flex items-center gap-2">
                    <FolderOpen width={18} />
                    Créer un dossier
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>⌘+⇧+U</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              onClick={() => {
                toggleShow(true);
              }}
              className="mt-4"
            >
              Créer un dossier
            </Button>
          )}
        </CredenzaTrigger>
        <CredenzaContent className="pb-5">
          <CredenzaHeader>
            <CredenzaTitle>Créer un dossier</CredenzaTitle>
          </CredenzaHeader>
          <CredenzaBody>
            <FolderForm />
          </CredenzaBody>
        </CredenzaContent>
      </Credenza>
    </>
  );
};
