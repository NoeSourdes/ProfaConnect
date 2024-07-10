"use client";

import { Ellipsis, LogOut, Star, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getUserProfileAction } from "@/actions/user/user";
import { CollapseMenuButton } from "@/src/components/admin-panel/collapse-menu-button";
import { Button } from "@/src/components/ui/button";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { getPages } from "@/src/lib/pages";
import { cn } from "@/src/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
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
  const pathname = usePathname();
  const pages = getPages(pathname, userProfile?.data?.role ?? "");
  const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;
  const [showCardPremium, setShowCardPremium] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("showCardPremium");
    const lastUpdated = localStorage.getItem("showCardPremiumLastUpdated");
    const now = Date.now();

    if (lastUpdated) {
      const timeSinceLastUpdate = now - parseInt(lastUpdated, 10);
      if (timeSinceLastUpdate > SEVEN_DAYS_IN_MS) {
        localStorage.setItem("showCardPremium", "true");
        localStorage.setItem("showCardPremiumLastUpdated", now.toString());
        setShowCardPremium(true);
      } else {
        setShowCardPremium(saved === "true");
      }
    } else {
      localStorage.setItem("showCardPremium", "true");
      localStorage.setItem("showCardPremiumLastUpdated", now.toString());
      setShowCardPremium(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("showCardPremium", showCardPremium.toString());
    localStorage.setItem("showCardPremiumLastUpdated", Date.now().toString());
  }, [showCardPremium]);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-7 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {pages.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={active ? "secondary" : "ghost"}
                              className="w-full justify-start h-10 mb-1"
                              asChild
                            >
                              <Link href={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end">
            {showCardPremium && (
              <>
                {isOpen ? (
                  <Card x-chunk="dashboard-02-chunk-0">
                    <div className="relative">
                      <div
                        onClick={() => {
                          setShowCardPremium(false);
                          localStorage.setItem("showCardPremium", "true");
                        }}
                        className="absolute -top-1 -right-1 bg-secondary h-4 w-4 rounded-full z-50 flex justify-center items-center cursor-pointer"
                      >
                        <X size={12} />
                      </div>
                      <CardHeader className="p-3">
                        <CardTitle>Passez à Pro</CardTitle>
                        <CardDescription>
                          Débloquez toutes les fonctionnalités !!
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-3">
                        <Button size="sm" className="w-full">
                          Mettre à niveau
                        </Button>
                      </CardContent>
                    </div>
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
              </>
            )}
          </li>
          <li className="w-full">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                    }}
                    variant="outline"
                    className="w-full justify-center h-10 mt-4"
                  >
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Se déconnecter
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Se déconnecter</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
