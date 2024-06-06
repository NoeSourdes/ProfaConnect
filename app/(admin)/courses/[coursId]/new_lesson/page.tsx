import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { Button } from "@/src/components/ui/button";
import { prisma } from "@/src/lib/prisma";
import type { PageParams } from "@/src/types/next";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewLessonComponent } from "../[lessonId]/edit/newLessonComponent";

export default async function RoutePage(
  props: PageParams<{
    coursId: string;
  }>
) {
  const nameCourse = await prisma.course.findUnique({
    where: {
      id: props.params.coursId,
    },
    select: {
      title: true,
    },
  });
  if (!nameCourse) {
    notFound();
  }
  return (
    <div className="h-full w-full">
      <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
        <div className="flex items-center gap-3">
          <Link href={`/courses/${props.params.coursId}`}>
            <Button size="icon" variant="outline">
              <Undo2 size={18} />
            </Button>
          </Link>
          <BreadcrumbComponent
            array={[
              {
                item: "Cours",
                link: "/courses",
              },
              {
                item: nameCourse.title,
                link: `/courses/${props.params.coursId}`,
              },
              {
                item: "Nouvelle leçon",
                link: `/courses/${props.params.coursId}/new_lesson`,
              },
            ]}
          />
        </div>
        <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <NewLessonComponent courseId={props.params.coursId} />
        </div>
      </main>
    </div>
  );
}
