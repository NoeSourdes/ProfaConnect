"use client";

import { Undo2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { BreadcrumbComponent } from "../Breadcrumb";

export default function IsErrorComponent() {
  return (
    <div className="h-full w-full">
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
        <Card className="rounded-lg shadow-none border-dashed mt-5">
          <CardContent className="p-6 pb-7">
            <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
              <div className="flex flex-col relative">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Une erreur s'est produite
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Impossible de charger les cours et les leçons. Veuillez
                    réessayer plus tard.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
