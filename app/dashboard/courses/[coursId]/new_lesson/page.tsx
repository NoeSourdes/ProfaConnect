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
    <div className="p-7 h-full w-full">
      <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">
            Création d'une nouvelle leçon
          </h1>
        </div>
        <BreadcrumbComponent
          array={[
            {
              item: "Dashboard",
              link: "/dashboard",
            },
            {
              item: "Cours",
              link: "/dashboard/courses",
            },
            {
              item: nameCourse.title,
              link: `/dashboard/courses/${props.params.coursId}`,
            },
            {
              item: "Nouvelle leçon",
              link: `/dashboard/courses/${props.params.coursId}/new_lesson`,
            },
          ]}
        />
        <div
          className="h-full w-full rounded-lg"
          x-chunk="dashboard-02-chunk-1"
        >
          <NewLessonComponent />
        </div>
      </main>
    </div>
  );
}
