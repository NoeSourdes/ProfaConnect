"use client";

import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { PreviewLesson } from "@/src/components/dashboard/preview_lesson/preview-lesson";
import { PreviewPdf } from "@/src/components/dashboard/preview_lesson/preview-pdf";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import type { PageParams } from "@/src/types/next";
import { useQuery } from "@tanstack/react-query";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { getLesson } from "./edit/lesson.action";

type LessonParams = {
  lessonId: string;
  coursId: string;
};

export default function RoutePage(props: PageParams<LessonParams>) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["lesson", props.params.lessonId],
    queryFn: async () => {
      const lesson = await getLesson(props.params.lessonId as string);
      return lesson;
    },
  });

  if (isLoading) {
    return (
      <>
        <div className="flex items-center gap-3 w-full">
          <Link href={`/courses/${props.params.coursId}`}>
            <Button size="icon" variant="outline">
              <Undo2 size={18} />
            </Button>
          </Link>
          <BreadcrumbComponent
            array={[
              { item: "Cours", link: "/courses" },
              { item: "Leçons", link: `/courses/${props.params.coursId}` },
            ]}
          />
        </div>
        <Card className="rounded-lg border-none mt-6 shadow-none">
          <CardContent className="p-6 pb-7">
            <Skeleton className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]"></Skeleton>
          </CardContent>
        </Card>
      </>
    );
  }

  if (isError || !data) {
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
                  item: "Leçons",
                  link: `/courses/${props.params.coursId}`,
                },
                {
                  item: "Erreur",
                  link: `/courses/${props.params.coursId}/${props.params.lessonId}`,
                },
              ]}
            />
          </div>
          <Card className="rounded-lg shadow-none border-dashed mt-5">
            <CardContent className="p-6 pb-7">
              <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                <div className="flex flex-col relative">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                      Une erreur s'est produite
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Impossible de charger les lessons. Veuillez réessayer plus
                      tard.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (data.url) {
    return (
      <PreviewPdf
        url={data.url}
        courseId={props.params.coursId}
        lessonId={props.params.lessonId}
        lessonTitle={data.title}
      />
    );
  }
  return (
    <PreviewLesson
      content={data.document}
      courseId={props.params.coursId}
      lessonId={props.params.lessonId}
      lessonTitle={data.title}
    />
  );
}
