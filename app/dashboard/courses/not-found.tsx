"use client";

import { BreadcrumbComponent } from "@/components/dashboard/Breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RouteError() {
  return (
    <div className="p-7 h-full w-full">
      <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Cours</h1>
        </div>
        <BreadcrumbComponent
          array={[
            {
              item: "Dashboard",
              link: "/dashboard",
            },
            {
              item: "Cours",
              link: "/dashboard/courses",
            },
          ]}
        />
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Le cours n'existe pas
            </h3>
            <p className="text-sm text-muted-foreground">
              Veuillez réessayer plus tard.
            </p>
            <Link href="/dashboard/courses" className="mt-4">
              <Button>Retourner à la liste des cours</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
