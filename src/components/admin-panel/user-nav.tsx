"use client";

import {
  LayoutGrid,
  LogOut,
  Settings,
  Shapes,
  SquareArrowUpRight,
  User,
} from "lucide-react";
import Link from "next/link";

import { getUserProfileAction } from "@/actions/user/user";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { getRoleFrench } from "@/src/hooks/user-actions";
import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

export function UserNav() {
  const { data: user } = useSession();

  const {
    data: userProfile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", user?.user?.id ?? ""],
    queryFn: async () => {
      const userProfile = await getUserProfileAction(user?.user?.id ?? "");
      return userProfile;
    },
  });

  console.log(userProfile);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={
                user?.user?.image
                  ? user?.user?.image
                  : "https://ui-avatars.com/api/?name=" + user?.user?.name
              }
              alt="Avatar"
            />
            <AvatarFallback className="bg-transparent">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.user?.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              {getRoleFrench(userProfile?.data?.role ?? "")}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/dashboard" className="flex items-center">
              <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
              Tableau de bord
            </Link>
          </DropdownMenuItem>
          <div className="flex items-center justify-between gap-1">
            <DropdownMenuItem
              className="hover:cursor-pointer w-[125px]"
              asChild
            >
              <div className="flex items-center">
                <SquareArrowUpRight className="w-4 h-4 mr-3 text-muted-foreground" />{" "}
                Partager
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <kbd
                onClick={() => {
                  navigator.clipboard.writeText(user?.user?.id ?? "");
                  toast.success("ID copié dans le presse-papiers");
                }}
                className="inline-flex h-full select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100"
              >
                copier ID
              </kbd>
            </DropdownMenuItem>
          </div>
          {userProfile?.data?.role === "TEACHER" && (
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link href="/settings" className="flex items-center">
                <Shapes className="w-4 h-4 mr-3 text-muted-foreground" />
                Ma classe
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/settings" className="flex items-center">
              <Settings className="w-4 h-4 mr-3 text-muted-foreground" />
              Paramètres
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
