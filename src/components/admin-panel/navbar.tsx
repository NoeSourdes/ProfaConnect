import { PageTitle } from "@/src/components/admin-panel/page-title";
import { SheetMenu } from "@/src/components/admin-panel/sheet-menu";
import { UserNav } from "@/src/components/admin-panel/user-nav";
import { ModeToggle } from "@/src/components/mode-toggle";

import { CommandBar } from "./CommandeBar";
import { UserNotification } from "./user-notification";
import { useFullScreen } from "@/src/hooks/documents/use-fullscreen";

export function Navbar() {
  const { isFullScreen, setIsFullScreen } = useFullScreen();
  return (
    <header
      className={`supports-backdrop-blur:bg-background/60 sticky top-0 w-full border-b bg-background/95 backdrop-blur ${
        isFullScreen ? "z-30" : "z-[4000]"
      }`}
    >
      <div className="mx-4 flex h-14 items-center gap-2">
        <div className="flex items-center max-[1200px]:space-x-4 transition-all max-[1200px]:ml-0 ml-4">
          <SheetMenu />
          <div className="max-sm:hidden">
            <PageTitle />
          </div>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <CommandBar />
          <div className="h-9 w-9">
            <UserNotification />
          </div>
          <div className="h-9 w-9">
            <ModeToggle />
          </div>
          <div className="h-9 w-9">
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
}
