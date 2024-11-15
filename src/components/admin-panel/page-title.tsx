import { Group, pagesUrl } from "@/src/lib/pages";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTitle() {
  const pathname = usePathname();
  const [pages, setPages] = useState<Group[]>([]);

  useEffect(() => {
    const fetchPages = async () => {
      const result = await pagesUrl(pathname);
      setPages(result);
    };

    fetchPages();
  }, [pathname]);

  const pageTitle = pages
    .map(({ menus }) => {
      const activeMenu = menus.find((menu) => menu.active);
      return activeMenu?.submenus && activeMenu.submenus.length > 0
        ? activeMenu.submenus.find((submenu) => submenu.active)?.label
        : activeMenu?.label ?? "";
    })
    .join("");

  const titleClassName =
    pageTitle === "ProfaBot"
      ? "font-bold bg-[linear-gradient(120deg,#6EB6F2,#a855f7,#ea580c,#eab308)] bg-clip-text text-transparent"
      : "font-bold";

  return <h1 className={titleClassName}>{pageTitle}</h1>;
}
