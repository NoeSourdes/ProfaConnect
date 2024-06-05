"use client";

import { Bell } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";

export type notificationProps = {};

export const UserNotification = (props: notificationProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full w-8 h-8 bg-background"
          variant="outline"
          size="icon"
        >
          <Bell className="w-[1.2rem] h-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Notifications</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-muted-foreground leading-none">
              Vous n'avez pas de notifications pour le moment !
            </p>
          </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
