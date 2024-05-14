"use client";

import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Undo2 } from "lucide-react";
import Link from "next/link";

export default function RouteError() {
  return (
    <div className="h-full w-full">
      <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
        <div className="flex items-center gap-3">
          <Link href={`/courses/`}>
            <Button size="icon" variant="secondary">
              <Undo2 size={20} />
            </Button>
          </Link>
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
        </div>
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
