"use client";

import { BreadcrumbComponent } from "@/components/dashboard/Breadcrumb";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  type CourseType = {
    id: string;
    userId: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    published: boolean | null;
    category: string | null;
  };

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
      <div className="p-7 h-full w-full overflow-y-scroll">
        <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Cours</h1>
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
      <div className="p-7 h-full w-full">
        <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Cours</h1>
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
            ]}
          />
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                Une erreur est survenue
              </h3>
              <p className="text-sm text-muted-foreground">
                Veuillez réessayer plus tard.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="p-7 h-full w-full">
      {courses?.length === 0 ? (
        <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Cours</h1>
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
            ]}
          />
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                Tu n'as pas encore de cours
              </h3>
              <p className="text-sm text-muted-foreground">
                Créez votre premier cours pour commencer à enseigner.
              </p>
              <Link href="/dashboard/courses/new_course">
                <Button className="mt-4">Créer un cours</Button>
              </Link>
            </div>
          </div>
        </main>
      ) : (
        <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Cours</h1>
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
            ]}
          />
          <div
            className="h-full w-full rounded-lg"
            x-chunk="dashboard-02-chunk-1"
          >
            <Link href="/dashboard/courses/new_course">
              <Button className="flex items-center gap-2 mb-4">
                {" "}
                <CirclePlus />
                Créer un cours
              </Button>
            </Link>
            <div className="w-full flex flex-wrap gap-4">
              {courses?.map((course) => (
                <div
                  key={course.id}
                  className="min-h-52 flex flex-col justify-between min-w-52 max-w-60 grow p-4 border rounded-lg"
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
                    <div className="flex gap-2 items-center">
                      <Link
                        className="w-full grow"
                        href={`/dashboard/courses/${course.id}`}
                      >
                        <Button className="w-full grow">Voir le cours</Button>
                      </Link>
                      <Link href={`/dashboard/courses/${course.id}/edit`}>
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
                              Êtes-vous sûr de vouloir supprimer le cours ?
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
