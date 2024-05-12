import Link from "next/link";

import { Menu } from "@/src/components/admin-panel/menu";
import { SidebarToggle } from "@/src/components/admin-panel/sidebar-toggle";
import { Button } from "@/src/components/ui/button";
import { useSidebarToggle } from "@/src/hooks/use-sidebar-toggle";
import { useStore } from "@/src/hooks/use-store";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import { useFullScreen } from "../dashboard/tiptap/fullScreen.store";

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const { isFullScreen, setIsFullScreen } = useFullScreen();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72",
        isFullScreen ? "z-30" : "z-[4001]"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto border-r">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300",
            sidebar?.isOpen === false ? "translate-x-0" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/img/logo.svg"
              alt="ProfaConnect"
              width={32}
              height={32}
            />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                sidebar?.isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              ProfaConnect
            </h1>
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}