import { getNameCourse } from "@/actions/courses/courses";
import {
  CalendarDays,
  FolderOpenDot,
  Gamepad2,
  LayoutGrid,
  MessageCircleMore,
  Settings,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getPages(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contenu",
      menus: [
        {
          href: "",
          label: "Cours",
          active: pathname.includes("/courses"),
          icon: FolderOpenDot,
          submenus: [
            {
              href: "/courses",
              label: "Tous les cours",
              active: pathname === "/courses",
            },
            {
              href: "/courses/new_course",
              label: "Ajouter un cours",
              active: pathname === "/courses/new_course",
            },
          ],
        },
        {
          href: "/schedule",
          label: "Calendrier",
          active: pathname.includes("/schedule"),
          icon: CalendarDays,
          submenus: [],
        },
        {
          href: "/communication",
          label: "Communication",
          active: pathname.includes("/communication"),
          icon: MessageCircleMore,
          submenus: [],
        },
        {
          href: "/games",
          label: "Mini-jeux",
          active: pathname.includes("/games"),
          icon: Gamepad2,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Paramètres",
      menus: [
        {
          href: "/settings",
          label: "Compte",
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}

const handleNameCourse = async (id: string) => {
  if (!id) {
    return;
  }
  const response = await getNameCourse(id);
  if (!response) {
    return "Le cours n'existe pas";
  }
  return response?.title;
};

export async function pagesUrl(pathname: string): Promise<Group[]> {
  const courseName = await handleNameCourse(pathname.split("/")[2]);

  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contenu",
      menus: [
        {
          href: "",
          label: "Cours",
          active: /\/courses(\/[a-z0-9]+)?/.test(pathname),
          icon: FolderOpenDot,
          submenus: [
            {
              href: "/courses",
              label: "Tous les cours",
              active: pathname === "/courses",
            },
            {
              href: "/courses/new_course",
              label: "Ajouter un cours",
              active: pathname === "/courses/new_course",
            },
            {
              href: "/courses/:id/new_lesson",
              label: "Ajouter une leçon",
              active: /\/courses\/[a-z0-9]+\/new_lesson/.test(pathname),
            },
            {
              href: "/courses/:id/edit",
              label: "Modifier le cours",
              active: /\/courses\/[a-z0-9]+\/edit/.test(pathname),
            },
            {
              href: "/courses/:id",
              label: "Details du cours : " + courseName,
              active: /\/courses\/[a-z0-9]+/.test(pathname),
            },
          ],
        },
        {
          href: "/schedule",
          label: "Calendrier",
          active: pathname.includes("/schedule"),
          icon: CalendarDays,
          submenus: [],
        },
        {
          href: "/communication",
          label: "Communication",
          active: pathname.includes("/communication"),
          icon: MessageCircleMore,
          submenus: [],
        },
        {
          href: "/games",
          label: "Mini-jeux",
          active: pathname.includes("/games"),
          icon: Gamepad2,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Paramètres",
      menus: [
        {
          href: "/settings",
          label: "Compte",
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
