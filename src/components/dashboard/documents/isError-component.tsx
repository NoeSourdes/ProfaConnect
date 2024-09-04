"use client";

import { Card, CardContent } from "../../ui/card";

export default function IsErrorComponent() {
  return (
    <div className="h-full w-full">
      <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
        <Card className="rounded-lg shadow-none border-dashed mt-5">
          <CardContent className="p-6">
            <div className="flex justify-center items-center min-h-[calc(93vh-56px-64px-20px-24px-56px-48px)]">
              <div className="flex flex-col relative">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Une erreur s'est produite
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Impossible de charger les dossier et les fichiers. Veuillez
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
