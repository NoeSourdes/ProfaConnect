"use client";

import { getNameCourse } from "@/actions/courses/courses";
import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import type { PageParams } from "@/src/types/next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  deleteLessonAction,
  getlessons,
} from "./[lessonId]/edit/lesson.action";

export default function RoutePage(
  props: PageParams<{
    coursId: string;
  }>
) {
  const handleNameCourse = async (idCourse: string) => {
    if (!idCourse) {
      return;
    }
    const response = await getNameCourse(idCourse);
    if (!response) {
      return;
    }
    return response.title;
  };

  const queryClient = useQueryClient();

  const { data: nameCourse, isLoading } = useQuery({
    queryKey: ["nameCourse", props.params.coursId],
    queryFn: async () => {
      return handleNameCourse(props.params.coursId);
    },
  });

  const {
    data: lessons,
    isLoading: isLoadingLessons,
    isError,
  } = useQuery({
    queryKey: ["lessons", props.params.coursId],
    queryFn: async () => {
      const lessons = await getlessons(props.params.coursId);
      return lessons;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (idLesson: { id: string }) => deleteLessonAction(idLesson.id),
    onSuccess: ({ data, serverError }) => {
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("La leçon a été supprimée avec succès");

      queryClient.invalidateQueries({
        queryKey: ["lessons", props.params.coursId],
      });
    },
  });

  if (isLoading) {
    return (
      <div className="h-full w-full">
        <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
          <BreadcrumbComponent
            array={[
              {
                item: "Home",
                link: "/",
              },
              {
                item: "Dashboard",
                link: "/dashboard",
              },
              {
                item: "Cours ",
                link: "/courses",
              },
              {
                item: "Chargement...",
                link: `/courses/${props.params.coursId}`,
              },
            ]}
          />
          <div className="w-full flex flex-wrap gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <Skeleton key={i} className="h-52 min-w-52 grow" />
            ))}
          </div>
        </main>
      </div>
    );
  }
  if (isLoadingLessons) {
    return (
      <div className="h-full w-full">
        <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
          <BreadcrumbComponent
            array={[
              {
                item: "Home",
                link: "/",
              },
              {
                item: "Dashboard",
                link: "/dashboard",
              },
              {
                item: "Cours ",
                link: "/courses",
              },
              {
                item: "Chargement...",
                link: `/courses/${props.params.coursId}`,
              },
            ]}
          />
          <div className="w-full flex flex-wrap gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <Skeleton key={i} className="h-52 min-w-52 grow" />
            ))}
          </div>
        </main>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="h-full w-full">
        <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
          <BreadcrumbComponent
            array={[
              {
                item: "Home",
                link: "/",
              },
              {
                item: "Dashboard",
                link: "/dashboard",
              },
              {
                item: "Cours",
                link: "/courses",
              },
              {
                item: "Erreur",
                link: `/courses/${props.params.coursId}`,
              },
            ]}
          />
          <Card className="rounded-lg shadow-none border-dashed mt-5">
            <CardContent className="p-6">
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

  return (
    <div className="h-full w-full">
      {lessons?.length === 0 ? (
        <>
          <BreadcrumbComponent
            array={[
              {
                item: "Home",
                link: "/",
              },
              {
                item: "Dashboard",
                link: "/dashboard",
              },
              {
                item: "Cours",
                link: "/courses",
              },
              {
                item: nameCourse ? nameCourse : "inconnu",
                link: `/courses/${props.params.coursId}`,
              },
            ]}
          />
          <Card className="rounded-lg shadow-none border-dashed mt-5">
            <CardContent className="p-6">
              <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                <div className="flex flex-col relative">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                      Tu n'as pas encore de leçon
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Tu n'as pas encore de leçon pour le cours{" "}
                      {nameCourse ? nameCourse : "inconnu"}. Créez-en une !
                    </p>
                    <Link href={`/courses/${props.params.coursId}/new_lesson`}>
                      <Button className="mt-4">Créer une leçon</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
          <BreadcrumbComponent
            array={[
              {
                item: "Home",
                link: "/",
              },
              {
                item: "Dashboard",
                link: "/dashboard",
              },
              {
                item: "Cours",
                link: "/courses",
              },
              {
                item: nameCourse ? nameCourse : "inconnu",
                link: `/courses/${props.params.coursId}`,
              },
            ]}
          />
          <div
            className="h-full w-full rounded-lg"
            x-chunk="dashboard-02-chunk-1"
          >
            <Link href={`/courses/${props.params.coursId}/new_lesson`}>
              <Button className="flex items-center gap-2 mb-4">
                {" "}
                <CirclePlus />
                Créer une leçon
              </Button>
            </Link>
            <div className="w-full flex flex-wrap gap-4">
              {lessons?.map((lesson) => (
                <div
                  key={lesson.lessonId}
                  className="h-52 min-w-60 sm:max-w-80 grow flex flex-col justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-semibold">
                        {lesson.title.length > 20
                          ? lesson.title.slice(0, 20) + "..."
                          : lesson.title}
                      </h2>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-end">
                      <p className="text-sm text-muted-foreground">
                        mis à jour le :{" "}
                        {new Date(lesson.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Link
                        className="w-full grow"
                        href={`/courses/${props.params.coursId}/${lesson.lessonId}`}
                      >
                        <Button className="w-full grow">Voir la leçon</Button>
                      </Link>
                      <Link
                        href={`/courses/${props.params.coursId}/${lesson.lessonId}`}
                      >
                        <Button size="icon" className="p-3">
                          <Pencil />
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="p-3"
                          >
                            <Trash2 />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Supprimer la leçon
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Êtes-vous sûr de vouloir supprimer la leçon ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive hover:bg-destructive/90"
                              onClick={() => {
                                deleteMutation.mutate({ id: lesson.lessonId });
                              }}
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
