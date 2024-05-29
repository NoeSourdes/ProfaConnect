import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { Button } from "@/src/components/ui/button";
import { requiredCurrentUser } from "@/src/lib/auth/current-user";
import { prisma } from "@/src/lib/prisma";
import type { PageParams } from "@/src/types/next";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewLessonComponent } from "./newLessonComponent";

export default async function RoutePage(
  props: PageParams<{
    coursId: string;
    lessonId: string;
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
  const lesson = await prisma.lesson.findUnique({
    where: {
      lessonId: props.params.lessonId,
      userId: user.id,
    },
    select: {
      title: true,
      document: true,
      url: true,
    },
  });

  if (!lesson) {
    notFound();
  }

  return (
    <div className="h-full w-full">
      <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
        <div className="flex items-center gap-3">
          <Link href={`/courses/${props.params.coursId}`}>
            <Button size="icon" variant="outline">
              <Undo2 size={20} />
            </Button>
          </Link>
          <BreadcrumbComponent
            array={[
              {
                item: course.title,
                link: `/courses/${props.params.coursId}`,
              },
              {
                item: lesson.title,
                link: `/courses/${props.params.coursId}/${props.params.lessonId}`,
              },
              {
                item: "Mettre à jour la leçon : " + lesson.title,
                link: `/courses/${props.params.coursId}/${props.params.lessonId}/edit`,
              },
            ]}
          />
        </div>
        <div
          className="h-full w-full rounded-lg"
          x-chunk="dashboard-02-chunk-1"
        >
          <NewLessonComponent
            courseId={props.params.coursId}
            lessonId={props.params.lessonId}
          />
        </div>
      </main>
    </div>
  );
}
