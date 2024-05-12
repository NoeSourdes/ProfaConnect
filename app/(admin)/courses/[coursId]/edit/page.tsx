import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { requiredCurrentUser } from "@/src/lib/auth/current-user";
import { prisma } from "@/src/lib/prisma";
import type { PageParams } from "@/src/types/next";
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
              item: "Mettre à jour un cours",
              link: `/courses/${props.params.coursId}/edit`,
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
