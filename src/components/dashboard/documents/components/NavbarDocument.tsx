import { buttonVariants } from "@/src/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { File } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { ViewSelect } from "../ViewSelect";
import { ButtonGetTreeView } from "./ButtonGetTree";
import { ButtonInfo } from "./ButtonInfo";
import { ButtonCreateFolder } from "./folders/ButtonCreateFolder";
import { SearchComponent } from "./searchComponent";

export const NavbarDocument = () => {
  const router = useRouter();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "i" && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        toast.success(
          "Redirection vers la page de création d'un nouveau fichier, Patientez..."
        );

        router.push("/documents/new_file");
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex w-full">
      <div className="flex items-center gap-3 w-full">
        <ButtonCreateFolder buttonInTop />
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <Link href="/documents/new_file">
              <TooltipTrigger
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                <div className="flex items-center gap-2">
                  <File width={18} />
                  Nouveau Fichier
                </div>
              </TooltipTrigger>
            </Link>
            <TooltipContent side="bottom">
              <p>⌘+⇧+I</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <SearchComponent />
      </div>
      <div className="flex items-center justify-end gap-3 min-w-[197px]">
        <ButtonGetTreeView />
        <ViewSelect />
        <ButtonInfo />
      </div>
    </div>
  );
};
