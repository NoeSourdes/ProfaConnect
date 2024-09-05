"use client";

import { Button } from "@/src/components/ui/button";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BreadcrumbComponent } from "../../Breadcrumb";
import { NavbarDocument } from "./NavbarDocument";

export const ComponentHeader = () => {
  const pathname = usePathname();
  const getLastSlash = pathname.split("/").pop(); // Utilisation de pop pour obtenir le dernier élément

  if (getLastSlash !== "new_file") {
    return (
      <div className="flex w-full pb-2">
        <div className="flex flex-col gap-5 w-full">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button size="icon" variant="outline">
                <Undo2 size={18} />
              </Button>
            </Link>
            <BreadcrumbComponent
              array={[
                {
                  item: "Mes documents",
                  link: "/documents",
                },
              ]}
            />
          </div>
          <NavbarDocument />
        </div>
      </div>
    );
  }

  return null;
};
