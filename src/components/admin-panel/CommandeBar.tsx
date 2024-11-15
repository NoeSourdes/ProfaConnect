"use client";

import {
  CalendarDays,
  CircleHelp,
  FolderOpenDot,
  Gamepad2,
  LayoutGrid,
  MessageCircleMore,
  MonitorIcon,
  MoonIcon,
  Search,
  Settings,
  SunIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/src/components/ui/command";
import { useTheme } from "next-themes";
import Image from "next/image";
import { DialogTitle } from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";

export function CommandBar() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="text-sm text-muted-foreground border rounded-md w-full sm:max-w-44 px-2 py-2 flex items-center justify-between hover:bg-secondary transition-all cursor-pointer group"
      >
        <span className="text-smt group-hover:text-accent-foreground transition-all flex items-center gap-2">
          <Search size={18} />
          Rechercher
        </span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-hover:text-accent-foreground transition-all">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="hidden">Commande Bar - Rechercher</DialogTitle>
        <CommandInput placeholder="Rechercher..." />

        <CommandList>
          <CommandEmpty className="flex flex-col items-center gap-2 p-3">
            <p className="text-sm text-muted-foreground text-center">
              Recherche en cours...
            </p>
            <Skeleton className="w-full h-[30px] rounded" />
            <Skeleton className="w-full h-[30px] rounded" />
            <Skeleton className="w-full h-[30px] rounded" />
          </CommandEmpty>

          <CommandGroup>
            <CommandItem
              key={"/profaBot"}
              onSelect={() => handleSelect("/profaBot")}
            >
              <Image
                src="/svg/star.svg"
                alt="logo star ai"
                width={24}
                height={24}
              />
              <span className="bg-[linear-gradient(120deg,#6EB6F2,#6EB6F2,#a855f7,#ea580c,#eab308)] bg-clip-text text-transparent font-medium pl-2">
                ProfaBot
              </span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Liens">
            {[
              { icon: LayoutGrid, label: "Tableau de bord", url: "/dashboard" },
              { icon: FolderOpenDot, label: "Documents", url: "/documents" },
              { icon: CalendarDays, label: "Calendrier", url: "/schedule" },
              {
                icon: MessageCircleMore,
                label: "Messagerie",
                url: "/messaging",
              },
              { icon: Gamepad2, label: "Jeux", url: "/games" },
              { icon: Settings, label: "Paramètres", url: "/settings" },
              { icon: CircleHelp, label: "Aide", url: "/FAQ" },
            ].map(({ icon: Icon, label, url }) => (
              <CommandItem key={url} onSelect={() => handleSelect(url)}>
                <Icon className="mr-2 h-4 w-4" />
                <span>{label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandSeparator />

          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => handleSelect("/documents")}>
              Créer un dossier
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/schedule")}>
              Créer un événement
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />

          <CommandGroup heading="Thème">
            {[
              { icon: SunIcon, label: "Light", theme: "light" },
              { icon: MoonIcon, label: "Dark", theme: "dark" },
              { icon: MonitorIcon, label: "System", theme: "system" },
            ].map(({ icon: Icon, label, theme }) => (
              <CommandItem
                key={theme}
                onSelect={() => {
                  setTheme(theme);
                  setOpen(false);
                }}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}
