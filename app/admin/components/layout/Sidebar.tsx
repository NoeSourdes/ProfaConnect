"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { LogOut, Settings, SunMoon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { CommandDialogSideBar } from "./component-sidbar/CommandDialog";
import { NavLinks } from "./component-sidbar/NavLinks";

export const Sidebar = () => {
  const { setTheme } = useTheme();
  return (
    <div className="h-full w-full p-4">
      <div className="space-y-4 flex flex-col justify-between h-full">
        <div>
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/img/logo.svg"
                alt="Logo Profaconnect"
                width={40}
                height={40}
              />
              <h1 className="text-xl font-semibold">ProfaConnect</h1>
            </div>
            <div>
              <CommandDialogSideBar />
            </div>
            <div>
              <h5 className="text-muted-foreground">Menu</h5>
            </div>

            <NavLinks />
            <div className="w-full border-b"></div>
            <div className="w-full rounded-md text-sm font-medium flex justify-between items-center hover:bg-primary/10 hover:text-primary text-muted-foreground h-11 px-4 py-2 transition-all cursor-pointer">
              <div className="flex items-center gap-2">
                <SunMoon />
                Mode sombre
              </div>
              <Switch
                onCheckedChange={() => {
                  setTheme(
                    document.documentElement.classList.contains("dark")
                      ? "light"
                      : "dark"
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <Link href="/admin/parametres">
            <Button
              size="lg_sideBar"
              variant="hover_sideBar"
              className="flex items-center justify-start gap-2 w-full"
            >
              <Settings />
              Paramètres
            </Button>
          </Link>
          <Button
            size="lg_sideBar"
            variant="hover_sideBar"
            className="flex items-center justify-start gap-2 w-full"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            <LogOut />
            Se déconnecter
          </Button>
        </div>
      </div>
    </div>
  );
};
