"use client";

import { Undo2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";
import { BreadcrumbComponent } from "../Breadcrumb";

export default function IsLoadingComponent() {
  return (
    <div>
      <div className="h-full w-full overflow-y-scroll">
        <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
          <div className="flex items-center gap-3 w-full">
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
          <div className="w-full flex flex-wrap gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <Skeleton key={i} className="h-52 min-w-52 grow" />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
