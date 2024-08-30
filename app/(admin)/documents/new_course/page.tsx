import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { Button } from "@/src/components/ui/button";
import type { PageParams } from "@/src/types/next";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { CourseForm } from "../[coursId]/edit/CourseForm";

export default function RoutePage(props: PageParams<{}>) {
  return (
    <div className="h-full w-full">
      <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
        <div className="flex items-center gap-3">
          <Link href="/documents">
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
                item: "Nouveau cours",
                link: "/documents/new_course",
              },
            ]}
          />
        </div>
        <div
          className="h-full w-full rounded-lg"
          x-chunk="dashboard-02-chunk-1"
        >
          <CourseForm />
        </div>
      </main>
    </div>
  );
}
