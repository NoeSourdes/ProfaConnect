import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { NewFileComponent } from "@/src/components/dashboard/documents/components/files/NewFileComponent";
import { Button } from "@/src/components/ui/button";
import { Undo2 } from "lucide-react";
import Link from "next/link";

interface RoutePageProps {
  params: Promise<{
    folderId: string;
  }>;
}

export default function RoutePage({ params }: RoutePageProps) {
  return (
    <div className="h-full w-full">
      <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
        <div className="flex items-center gap-3">
          <Link href={`/documents`}>
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
              {
                item: "Nouveau fichier",
                link: `/documents/new_file`,
              },
            ]}
          />
        </div>
        <div className="">
          <NewFileComponent />
        </div>
      </main>
    </div>
  );
}
