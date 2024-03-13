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

export const NavLinks = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(links).map(([label, { icon: Icon, href }]) => (
        <Link key={label + href} href={href}>
          <Button
            variant={pathname === href ? "default" : "hover_sideBar"}
            size="lg_sideBar"
            className="w-full flex justify-start items-center gap-2"
          >
            <Icon />
            {label}
          </Button>
        </Link>
      ))}
    </div>
  );
};
