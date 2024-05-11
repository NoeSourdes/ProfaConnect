import { BreadcrumbComponent } from "@/components/dashboard/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="h-full w-full">
      <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
        <BreadcrumbComponent
          array={[
            {
              item: "Dashboard",
              link: "/dashboard",
            },
            {
              item: "Cours ",
              link: "/courses",
            },
            {
              item: nameCourse.title,
              link: `/courses/${props.params.coursId}`,
            },
          ]}
        />
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">
            Cours : <span className="text-primary">{nameCourse.title}</span>
          </h1>
        </div>
        <Card className="rounded-lg shadow-none border-dashed">
          <CardContent className="p-6">
            <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
              <div className="flex flex-col relative">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Tu n'as pas encore de leçon
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Créez votre première leçon pour commencer à enseigner.
                  </p>
                  <Link
                    href={`/courses/${props.params.coursId}/new_lesson`}
                    as={`/courses/${props.params.coursId}/new_lesson`}
                  >
                    <Button className="mt-4">Créer une leçon</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
