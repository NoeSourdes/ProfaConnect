import { getNameCourse } from "@/actions/courses/courses";
import { getNameLesson } from "@/app/(admin)/courses/[coursId]/[lessonId]/edit/lesson.action";
import {
  CalendarDays,
  CircleHelp,
  FolderOpenDot,
  Gamepad2,
  LayoutGrid,
  MessageCircleMore,
  Settings,
  Shapes,
  SquareGanttChart,
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

export function getPages(pathname: string, userRole?: string): Group[] {
  const contentMenus: (Menu | false)[] = [
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
          label: "Créer un cours",
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
      href: "/messaging",
      label: "Messagerie",
      active: pathname.includes("/messaging"),
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
    userRole === "TEACHER" && {
      href: "/classroom",
      label: "Ma classe",
      active: pathname.includes("/classroom"),
      icon: Shapes,
      submenus: [],
    },
    userRole === "STUDENT" && {
      href: "/internship",
      label: "Mon livret de stage",
      active: pathname.includes("/internship"),
      icon: SquareGanttChart,
      submenus: [],
    },
  ];

  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Tableau de bord",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contenu",
      menus: contentMenus.filter((menu): menu is Menu => Boolean(menu)), // Ajoutez ce filtre pour enlever les valeurs falsy
    },
    {
      groupLabel: "Lien rapide",
      menus: [
        {
          href: "/settings",
          label: "Paramètres",
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: [],
        },
        {
          href: "FAQ",
          label: "Centre d'aide",
          active: pathname.includes("/faq"),
          icon: CircleHelp,
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

const handleNameLesson = async (id: string) => {
  if (!id) {
    return;
  }
  const response = await getNameLesson(id);
  if (!response) {
    return "La leçon n'existe pas";
  }
  return response?.title;
};

export async function pagesUrl(pathname: string): Promise<Group[]> {
  const courseName = await handleNameCourse(pathname.split("/")[2]);
  const lessonName = await handleNameLesson(pathname.split("/")[3]);

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
              href: "/courses/:id/:id",
              label: "Details de la leçon ",
              active: /\/courses\/[a-z0-9]+\/[a-z0-9]+/.test(pathname),
            },
            {
              href: "/courses/:id",
              label: "Details du cours ",
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
          href: "/messaging",
          label: "Messagerie",
          active: pathname.includes("/messaging"),
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
        {
          href: "/classroom",
          label: "Ma classe",
          active: pathname.includes("/classroom"),
          icon: Shapes,
          submenus: [],
        },
        {
          href: "/internship",
          label: "Mon livret de stage",
          active: pathname.includes("/internship"),
          icon: SquareGanttChart,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Lien rapide",
      menus: [
        {
          href: "/settings",
          label: "Paramètres",
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: [],
        },
        // {
        //   href: "Profile",
        //   label: "Profil",
        //   active: pathname.includes("/profile"),
        //   icon: User,
        //   submenus: [],
        // },
        {
          href: "FAQ",
          label: "Centre d'aide",
          active: pathname.includes("/faq"),
          icon: CircleHelp,
          submenus: [],
        },
      ],
    },
  ];
}
