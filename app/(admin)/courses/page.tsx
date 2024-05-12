"use client";

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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";
import {
  deleteCourseAction,
  getUserCourses,
} from "./[coursId]/edit/course.actions";

export default function Course() {
  const { data: user } = useSession();
  const queryClient = useQueryClient();
  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses", user?.user?.id ? user.user.id : ""],
    queryFn: async () => {
      const courses = await getUserCourses(user?.user?.id ? user.user.id : "");
      return courses;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (idCourse: { id: string }) => deleteCourseAction(idCourse.id),
    onSuccess: ({ data, serverError }) => {
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("Le cours a été supprimé avec succès");

      queryClient.invalidateQueries({
        queryKey: ["courses", user?.user?.id ? user.user.id : ""],
      });
    },
  });

  if (isLoading) {
    return (
      <div className="h-full w-full overflow-y-scroll">
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
                      Impossible de charger les cours. Veuillez réessayer plus
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
      {courses?.length === 0 ? (
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
            ]}
          />
          <Card className="rounded-lg shadow-none border-dashed mt-5">
            <CardContent className="p-6">
              <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                <div className="flex flex-col relative">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                      Tu n'as pas encore de cours
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Créez votre premier cours pour commencer à enseigner.
                    </p>
                    <Link href="/courses/new_course">
                      <Button className="mt-4">Créer un cours</Button>
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
            ]}
          />
          <div
            className="h-full w-full rounded-lg"
            x-chunk="dashboard-02-chunk-1"
          >
            <Link href="/courses/new_course">
              <Button className="flex items-center gap-2 mb-4">
                {" "}
                <CirclePlus />
                Créer un cours
              </Button>
            </Link>
            <Button className="flex items-center gap-2 mb-4">
              {" "}
              <CirclePlus />
              Créer un cours
            </Button>
            <div className="w-full flex flex-wrap gap-4">
              {courses?.map((course) => (
                <div
                  key={course.id}
                  className="h-52 min-w-60 sm:max-w-80 grow flex flex-col justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-semibold">
                        {course.title.length > 20
                          ? course.title.slice(0, 20) + "..."
                          : course.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {course.description.length > 80
                          ? course.description.slice(0, 80) + "..."
                          : course.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-end">
                      <p className="text-sm text-muted-foreground">
                        mis à jour le :{" "}
                        {new Date(course.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Link
                        className="w-full grow"
                        href={`courses/${course.id}`}
                      >
                        <Button className="w-full grow">Voir le cours</Button>
                      </Link>
                      <Link href={`courses/${course.id}/edit`}>
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
                              Supprimer le cours
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Êtes-vous sûr de vouloir supprimer le cours, et
                              toutes les leçons associées à {course.title} ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive hover:bg-destructive/90"
                              onClick={() => {
                                deleteMutation.mutate({ id: course.id });
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
