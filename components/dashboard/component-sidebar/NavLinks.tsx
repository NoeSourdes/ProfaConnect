"use client";

import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  FolderOpenDot,
  Gamepad2,
  LayoutDashboard,
  MessageCircleMore,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = {
  Dashboard: {
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  Cours: {
    icon: FolderOpenDot,
    href: "/dashboard/courses",
  },
  "Emplois du temps": {
    icon: CalendarDays,
    href: "/dashboard/schedules",
  },
  Communication: {
    icon: MessageCircleMore,
    href: "/dashboard/communication",
  },
  "Mini jeux": {
    icon: Gamepad2,
    href: "/dashboard/games",
  },
};

interface NavLinksProps {
  isSidebarOpen: boolean;
}

export const NavLinks = ({ isSidebarOpen }: NavLinksProps) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(links).map(([label, { icon: Icon, href }]) => (
        <Link key={label + href} href={href}>
          <Button
            variant={pathname === href ? "default" : "hover_sideBar"}
            size="lg_sideBar"
            className="w-full flex justify-start items-center overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <Icon size={20} />
              <div
                className={`${isSidebarOpen ? "" : "opacity-0"} transition-all`}
              >
                {label}
              </div>
            </div>
          </Button>
        </Link>
      ))}
    </div>
  );
};
