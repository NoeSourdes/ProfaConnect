import { getNameFile } from "@/actions/admin/files/file.action";
import { getNameFolder } from "@/actions/admin/folders/folder.actions";
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
      href: "/documents",
      label: "Documents",
      active: pathname.includes("/documents"),
      icon: FolderOpenDot,
      submenus: [],
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
      label: "Mes classes",
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

const handleNameFolder = async (id: string) => {
  if (!id) {
    return;
  }
  const response = await getNameFolder(id);
  if (!response) {
    return "Le dossier n'existe pas";
  }
  return response?.title;
};

const handleNameFile = async (id: string) => {
  if (!id) {
    return;
  }
  const response = await getNameFile(id);
  if (!response) {
    return "La fichier n'existe pas";
  }
  return response?.title;
};

export async function pagesUrl(pathname: string): Promise<Group[]> {
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
          label: "Documents",
          active: /\/documents(\/[a-z0-9]+)?/.test(pathname),
          icon: FolderOpenDot,
          submenus: [
            {
              href: "/documents",
              label: "Mes documents",
              active: pathname === "/documents",
            },
            {
              href: "/documents/new_folder",
              label: "Ajouter un dossier",
              active: pathname === "/documents/new_folder",
            },
            {
              href: "/documents/new_file",
              label: "Ajouter une fichier",
              active: pathname === "/documents/new_file",
            },
            {
              href: "/documents/:id/new_file",
              label: "Ajouter une fichier",
              active: /\/\documents\/[a-z0-9]+\/new_file/.test(pathname),
            },
            {
              href: "/documents/:id/edit",
              label: "Modifier le dossier",
              active: /\/documents\/[a-z0-9]+\/edit/.test(pathname),
            },
            {
              href: "/documents/:id/:id",
              label: "Details de la fichier ",
              active: /\/\documents\/[a-z0-9]+\/[a-z0-9]+/.test(pathname),
            },
            {
              href: "/documents/:id",
              label: "Details du dossier",
              active: /\/documents\/[a-z0-9]+/.test(pathname),
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
          label: "Mes classes",
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
