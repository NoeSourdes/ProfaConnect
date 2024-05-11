"use client";

import { BreadcrumbComponent } from "@/components/dashboard/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function RouteError() {
  return (
    <div className="h-full w-full">
      <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
        <BreadcrumbComponent
          array={[
            {
              item: "Dashboard",
              link: "/dashboard",
            },
            {
              item: "Cours",
              link: "/courses",
            },
          ]}
        />
        <Card className="rounded-lg shadow-none border-dashed">
          <CardContent className="p-6">
            <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
              <div className="flex flex-col relative">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Le cours n'existe pas
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Veuillez réessayer plus tard.
                  </p>
                  <Link href="/courses" className="mt-4">
                    <Button>Retourner à la liste des cours</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
