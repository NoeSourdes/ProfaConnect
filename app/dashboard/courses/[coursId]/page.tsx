import { BreadcrumbComponent } from "@/components/dashboard/Breadcrumb";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
            Cours : <span className="text-primary">{nameCourse.title}</span>
          </h1>
        </div>
        <BreadcrumbComponent
          array={[
            {
              item: "Dashboard",
              link: "/dashboard",
            },
            {
              item: "Cours ",
              link: "/dashboard/courses",
            },
            {
              item: nameCourse.title,
              link: `/dashboard/courses/${props.params.coursId}`,
            },
          ]}
        />
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Tu n'as pas encore de leçon dans ce cours
            </h3>
            <p className="text-sm text-muted-foreground">
              Créez votre première leçon pour commencer à enseigner.
            </p>
            <Link
              href="/dashboard/courses/[coursId]/lessons/new_lesson"
              as={`/dashboard/courses/${props.params.coursId}/new_lesson`}
            >
              <Button className="mt-4">Créer une leçon</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
