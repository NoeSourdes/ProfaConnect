import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { Button } from "@/src/components/ui/button";
import { requiredCurrentUser } from "@/src/lib/auth/current-user";
import { prisma } from "@/src/lib/prisma";
import type { PageParams } from "@/src/types/next";
import { Undo2 } from "lucide-react";
import Link from "next/link";
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
      authorId: user.id,
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
      <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
        <div className="flex items-center gap-3">
          <Link href={`/documents/${props.params.coursId}`}>
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
                item: "Mettre à jour un cours",
                link: `/documents/${props.params.coursId}/edit`,
              },
            ]}
          />
        </div>
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
