"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, LogOut, Settings, Star, SunMoon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../ToogleTheme";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CommandDialogSideBar } from "./component-sidebar/CommandDialog";
import { NavLinks } from "./component-sidebar/NavLinks";

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {
  const { setTheme } = useTheme();
  return (
    <div className="h-full w-full px-4 py-4 border-r overflow-hidden">
      <div
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-10 -right-3.5 w-7 h-7 flex justify-center items-center bg-secondary rounded-full text-primary cursor-pointer z-20"
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

            <NavLinks isSidebarOpen={isSidebarOpen} />
            <div className="w-full border-b"></div>
            <div className="w-full">
              <div
                className="w-full rounded-md text-sm font-medium justify-between items-center hover:bg-primary/10 hover:text-primary text-muted-foreground h-11 px-3 py-3 transition-all cursor-pointer"
                style={{
                  display: isSidebarOpen ? "flex" : "none",
                }}
              >
                <div className="flex items-center gap-2">
                  <SunMoon size={20} />
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
              <div
                style={{
                  display: isSidebarOpen ? "none" : "block",
                }}
              >
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="mb-3">
            {isSidebarOpen ? (
              <Card x-chunk="dashboard-02-chunk-0">
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle>Passez à Pro</CardTitle>
                  <CardDescription>
                    Débloquez toutes les fonctionnalités et obtenez un accès
                    illimité à notre équipe de support.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full">
                    Mettre à niveau
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Button
                size="lg_sideBar"
                variant="hover_sideBar"
                className="flex items-center justify-start gap-2 w-full overflow-hidden"
              >
                <Star fill="#2563EB" color="#2563EB" />
              </Button>
            )}
          </div>
          <Link href="/dashboard/settings">
            <Button
              size="lg_sideBar"
              variant="hover_sideBar"
              className="flex items-center justify-start gap-2 w-full overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <Settings size={20} />
                <div
                  className={`${
                    isSidebarOpen ? "" : "opacity-0"
                  } transition-all`}
                >
                  Paramètres
                </div>
              </div>
            </Button>
          </Link>
          <Button
            size="lg_sideBar"
            variant="hover_sideBar"
            className="flex items-center justify-start gap-2 w-full overflow-hidden"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            <div className="flex items-center gap-2">
              <LogOut size={20} />
              <div
                className={`${isSidebarOpen ? "" : "opacity-0"} transition-all`}
              >
                Se déconnecter
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
