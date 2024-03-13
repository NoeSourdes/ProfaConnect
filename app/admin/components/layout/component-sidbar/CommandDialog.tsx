"use client";

import {
  CalendarDays,
  Command,
  FolderOpenDot,
  Gamepad2,
  LayoutDashboard,
  Mail,
  MessageCircleMore,
  Search,
  Smile,
  User,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";

export function CommandDialogSideBar() {
  const [open, setOpen] = React.useState(false);

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

  const CommandGroupLinks = {
    Dashboard: {
      icon: LayoutDashboard,
      href: "/admin",
    },
    Cours: {
      icon: FolderOpenDot,
      href: "/admin/cours",
    },
    "Emplois du temps": {
      icon: CalendarDays,
      href: "/admin/emplois-du-temps",
    },
    Communication: {
      icon: MessageCircleMore,
      href: "/admin/communication",
    },
    "Mini jeux": {
      icon: Gamepad2,
      href: "/admin/mini-jeux",
    },
  };

  return (
    <>
      <Button
        size="lg_sideBar"
        variant={"outline"}
        className="flex justify-between items-center w-full border"
      >
        <div className="flex items-center gap-3 text-muted-foreground">
          <Search />
          Rechercher
        </div>
        <div className=" text-muted-foreground flex items-center gap-1">
          <div className="bg-secondary w-5 h-5 flex items-center justify-center rounded-[3px]">
            <Command size={15} />
          </div>
          <span className="bg-secondary w-5 h-5 flex items-center justify-center rounded-[3px]">
            K
          </span>
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Rechercher..." />
        <CommandList>
          <CommandEmpty>Aucun résultat pour la recherche</CommandEmpty>
          <CommandGroup heading="Liens">
            {Object.entries(CommandGroupLinks).map(
              ([label, { icon: Icon, href }]) => (
                <Link key={label + href} href={href}>
                  <CommandItem>
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{label}</span>
                  </CommandItem>
                </Link>
              )
            )}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Mail className="mr-2 h-4 w-4" />
              <span>Mail</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
