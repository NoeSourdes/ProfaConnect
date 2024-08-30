import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { Button } from "@/src/components/ui/button";
import type { PageParams } from "@/src/types/next";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { NewLessonComponent } from "../[coursId]/[lessonId]/edit/newLessonComponent";

export default async function RoutePage(
  props: PageParams<{
    coursId: string;
  }>
) {
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
                item: "Nouvelle leçon",
                link: `/documents/new_lesson`,
              },
            ]}
          />
        </div>
        <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <NewLessonComponent />
        </div>
      </main>
    </div>
  );
}
