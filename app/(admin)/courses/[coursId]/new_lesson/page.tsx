import { BreadcrumbComponent } from "@/components/dashboard/Breadcrumb";
import { prisma } from "@/lib/prisma";
import type { PageParams } from "@/types/next";
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
      <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
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
        <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <NewLessonComponent />
        </div>
      </main>
    </div>
  );
}
