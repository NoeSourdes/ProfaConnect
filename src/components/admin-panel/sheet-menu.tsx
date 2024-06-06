import { MenuIcon } from "lucide-react";
import Link from "next/link";

import { Menu } from "@/src/components/admin-panel/menu";
import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import Image from "next/image";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="max-[1200px]:flex hidden" asChild>
        <Button className="h-9" variant="outline" size="icon">
          <MenuIcon size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="sm:w-72 px-3 h-full flex flex-col z-[10002]"
        side="left"
      >
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
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
              <h1 className="font-bold text-lg">ProfaConnect</h1>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
