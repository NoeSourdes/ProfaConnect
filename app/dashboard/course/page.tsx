import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Course() {
  return (
    <div className="p-7 h-full w-full">
      <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Cours</h1>
        </div>
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Tu n'as pas encore de cours
            </h3>
            <p className="text-sm text-muted-foreground">
              Créez votre premier cours pour commencer à enseigner.
            </p>
            <Link href="/dashboard/course/new">
              <Button className="mt-4">Créer un cours</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
