import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import Link from "next/link";
import { ButtonCreateFolder } from "../folders/ButtonCreateFolder";

export const NoResults = () => (
  <Card className="rounded-lg shadow-none border-dashed w-full">
    <CardContent className=" bg-transparent flex items-center justify-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
      <div className="flex flex-col relative">
        <div className="flex flex-col relative">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Aucun résultat trouvé
            </h3>
            <p className="text-sm text-muted-foreground">
              Aucun document ne correspond à votre recherche. Veuillez réessayer
              avec un autre mot-clé.
            </p>
            <div className="flex items-center gap-5">
              <ButtonCreateFolder />
              <Link href="/documents/new_file">
                <Button className="mt-4">Créer une fichier</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
