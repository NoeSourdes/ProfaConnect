"use client";

import { Command, Search } from "lucide-react";
import * as React from "react";

import { Button } from "@/src/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";

interface CommandDialogSideBarProps {
  isSidebarOpen: boolean;
}

export function CommandDialogSideBar({
  isSidebarOpen,
}: CommandDialogSideBarProps) {
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

  return (
    <>
      <Button
        size="lg_sideBar_search"
        variant={"outline"}
        className={`relative flex items-center w-full border text-muted-foreground hover:text-muted-foreground gap-2 overflow-hidden ${
          isSidebarOpen ? " justify-between" : "justify-center"
        }`}
        onClick={() => setOpen(true)}
      >
        <div className={`w-full flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <Search size={18} />
            <span
              className={`${isSidebarOpen ? "" : "opacity-0"} transition-all`}
            >
              Rechercher
            </span>
          </div>
          <div
            className={`flex items-center gap-1 ${
              isSidebarOpen ? "" : "opacity-0"
            } transition-all`}
          >
            <div className="bg-secondary w-5 h-5 flex items-center justify-center rounded-[3px]">
              <Command size={15} />
            </div>
            <span className="bg-secondary w-5 h-5 flex items-center justify-center rounded-[3px]">
              K
            </span>
          </div>
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="">
          <CommandEmpty>Aucun résultat trouvé</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
