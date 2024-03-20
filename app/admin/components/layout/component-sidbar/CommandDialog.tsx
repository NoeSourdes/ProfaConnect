"use client";

import {
  CalendarDays,
  Command,
  FolderOpenDot,
  Gamepad2,
  LayoutDashboard,
  MessageCircleMore,
  Search,
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
} from "@/components/ui/command";

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
        size={isSidebarOpen ? "lg_sideBar" : "sm"}
        variant={"outline"}
        className="flex justify-between items-center w-full border"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-3 text-muted-foreground">
          <Search />
          <span
            className={`${
              isSidebarOpen ? "opacity-1" : "opacity-0"
            } transition-all`}
          >
            Rechercher
          </span>
        </div>
        <div
          className={`text-muted-foreground flex items-center gap-1 ${
            isSidebarOpen ? "opacity-1" : "opacity-0"
          } transition-all`}
        >
          <div className="bg-secondary w-5 h-5 flex items-center justify-center rounded-[3px]">
            <Command size={15} />
          </div>
          <span className="bg-secondary w-5 h-5 flex items-center justify-center rounded-[3px]">
            K
          </span>
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
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
