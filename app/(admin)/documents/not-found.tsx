"use client";

import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Undo2 } from "lucide-react";
import Link from "next/link";

export default function RouteError() {
  return (
    <div className="h-full w-full">
      <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
        <div className="flex items-center gap-3">
          <Link href={`/documents/`}>
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
        <Card className="rounded-lg shadow-none border-dashed">
          <CardContent className="p-6 pb-7">
            <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
              <div className="flex flex-col relative">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Le dossier n'existe pas
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Veuillez réessayer plus tard.
                  </p>
                  <Link href="/documents" className="mt-4">
                    <Button>Retourner à la liste des dossier</Button>
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
