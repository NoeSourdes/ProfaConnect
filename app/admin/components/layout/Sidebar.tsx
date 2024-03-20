"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, LogOut, Settings, SunMoon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { CommandDialogSideBar } from "./component-sidbar/CommandDialog";
import { NavLinks } from "./component-sidbar/NavLinks";

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {
  const { setTheme } = useTheme();
  return (
    <div className="h-full w-full p-4 border-r overflow-hidden">
      <div
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-10 -right-3.5 w-7 h-7 flex justify-center items-center bg-[#EDF2FE] rounded-full text-primary cursor-pointer z-20"
        style={{
          transform: `rotate(${isSidebarOpen ? "180deg" : "0deg"})`,
          transition: "all 0.2s",
        }}
      >
        <ChevronLeft size={15} />
      </div>
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
              <h1
                className={`text-xl font-semibold transition-all ${
                  isSidebarOpen ? "opacity-1" : "opacity-0"
                }`}
              >
                ProfaConnect
              </h1>
            </div>
            <div>
              <CommandDialogSideBar isSidebarOpen={isSidebarOpen} />
            </div>
            <div>
              <h5 className="text-muted-foreground">Menu</h5>
            </div>

            <NavLinks />
            <div className="w-full border-b"></div>
            <div className="w-full rounded-md text-sm font-medium flex justify-between items-center hover:bg-primary/10 hover:text-primary text-muted-foreground h-11 px-3 py-3 transition-all cursor-pointer">
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
