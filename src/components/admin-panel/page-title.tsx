import { Group, pagesUrl } from "@/src/lib/pages";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
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
      ? "font-bold bg-[linear-gradient(120deg,#6EB6F2,#6EB6F2,#6EB6F2,#a855f7,#ea580c,#eab308,#eab308,#eab308)] bg-clip-text text-transparent"
      : "font-bold";

  return (
    <h1
      className={cn(
        titleClassName,
        pageTitle === "ProfaBot" ? "flex items-center gap-2" : ""
      )}
    >
      {pageTitle === "ProfaBot" && (
        <Image src="/svg/star.svg" alt="logo star ai" width={24} height={24} />
      )}
      {pageTitle}
      {pageTitle === "ProfaBot" && (
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-hover:text-accent-foreground transition-all">
          beta
        </kbd>
      )}
    </h1>
  );
}
