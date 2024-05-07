import { BreadcrumbComponent } from "@/components/dashboard/Breadcrumb";
import { requiredCurrentUser } from "@/lib/auth/current-user";
import { prisma } from "@/lib/prisma";
import type { PageParams } from "@/types/next";
import { notFound } from "next/navigation";
import { CourseForm } from "./CourseForm";

export default async function RoutePage(
  props: PageParams<{
    coursId: string;
  }>
) {
  const user = await requiredCurrentUser();

  const course = await prisma.course.findUnique({
    where: {
      id: props.params.coursId,
      userId: user.id,
    },
    select: {
      title: true,
      description: true,
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="p-7 h-full w-full">
      <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">
            Mettre à jour un cours
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
              item: "Mettre à jour un cours",
              link: `/dashboard/courses/${props.params.coursId}/edit`,
            },
          ]}
        />
        <div
          className="h-full w-full rounded-lg"
          x-chunk="dashboard-02-chunk-1"
        >
          <CourseForm defaultValues={course} courseId={props.params.coursId} />
        </div>
      </main>
    </div>
  );
}
