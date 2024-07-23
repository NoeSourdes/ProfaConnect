"use client";

import { getNameCourse } from "@/actions/admin/courses/course.actions";
import { useViewSelect } from "@/actions/admin/courses/viewSelect.store";
import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { ViewSelect } from "@/src/components/dashboard/courses/ViewSelect";
import { PopoverActionLesson } from "@/src/components/dashboard/lesson/PopoverActionLesson";
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
import { Input } from "@/src/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Skeleton } from "@/src/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import type { PageParams } from "@/src/types/next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CirclePlus,
  EllipsisVertical,
  FileText,
  Pencil,
  Trash2,
  Undo2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { toast } from "sonner";
import {
  deleteLessonAction,
  getlessons,
} from "../../../../actions/admin/lessons/lesson.action";

export default function RoutePage(
  props: PageParams<{
    coursId: string;
  }>
) {
  const router = useRouter();
  const { view } = useViewSelect();
  const { data: user } = useSession();
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

  // gestion de nuqs

  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });

  const params = useSearchParams();
  const searchParams = params.get("search");

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
        <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
          <div className="flex items-center gap-3">
            <Link href={`/courses`}>
              <Button size="icon" variant="outline">
                <Undo2 size={18} />
              </Button>
            </Link>

            <BreadcrumbComponent
              array={[
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
          </div>
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
        <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
          <div className="flex items-center gap-3">
            <Link href={`/courses`}>
              <Button size="icon" variant="outline">
                <Undo2 size={18} />
              </Button>
            </Link>

            <BreadcrumbComponent
              array={[
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
          </div>
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
        <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
          <div className="flex items-center gap-3">
            <Link href={`/courses`}>
              <Button size="icon" variant="outline">
                <Undo2 size={18} />
              </Button>
            </Link>

            <BreadcrumbComponent
              array={[
                {
                  item: "Cours ",
                  link: "/courses",
                },
                {
                  item: "Erreur",
                  link: `/courses/${props.params.coursId}`,
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

  return (
    <div className="h-full w-full">
      {lessons?.length === 0 ? (
        <>
          <div className="flex items-center gap-3">
            <Link href={`/courses`}>
              <Button size="icon" variant="outline">
                <Undo2 size={18} />
              </Button>
            </Link>
            <BreadcrumbComponent
              array={[
                {
                  item: "Cours ",
                  link: "/courses",
                },
                {
                  item: nameCourse ? nameCourse : "inconnu",
                  link: `/courses/${props.params.coursId}`,
                },
              ]}
            />
          </div>
          <Card className="rounded-lg shadow-none border-dashed mt-5 bg-transparent">
            <CardContent className="p-6 pb-7">
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
        <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href={`/courses`}>
                <Button size="icon" variant="outline">
                  <Undo2 size={18} />
                </Button>
              </Link>
              <BreadcrumbComponent
                array={[
                  {
                    item: "Cours ",
                    link: "/courses",
                  },
                  {
                    item: nameCourse ? nameCourse : "inconnu",
                    link: `/courses/${props.params.coursId}`,
                  },
                ]}
              />
            </div>
            <ViewSelect />
          </div>
          <div className="h-full w-full" x-chunk="dashboard-02-chunk-1">
            <div className="flex gap-3 pb-5">
              <Link
                href="/courses/[coursId]/new_lesson"
                as={`/courses/${props.params.coursId}/new_lesson`}
              >
                <Button className="flex items-center gap-2">
                  {" "}
                  <CirclePlus />
                  <span className="sm:block hidden">Créer une leçon</span>
                </Button>
              </Link>
              {/* <Popover>
                <PopoverTrigger>
                  <Button variant="secondary">
                    <SlidersHorizontal size={18} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="text-warning font-medium">
                  En cours de développement
                </PopoverContent>
              </Popover> */}

              <Input
                defaultValue={search}
                className="w-full max-w-96"
                type="text"
                id="search"
                placeholder="Rechercher un cours"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {view === "grid_view" ? (
              <div className="w-full flex flex-wrap gap-4">
                {lessons
                  ?.filter((lesson) =>
                    lesson.title
                      .toLowerCase()
                      .includes(searchParams?.toLowerCase() ?? "")
                  )
                  .map((lesson) => (
                    <div
                      key={lesson.lessonId}
                      className="h-48 sm:max-w-80 grow flex flex-col p-4 justify-between border rounded-2xl shadow-lg hover:ring ring-primary/70 cursor-pointer transition-all hover:shadow-blue bg-background"
                      onDoubleClick={() => {
                        router.push(
                          `/courses/${props.params.coursId}/${lesson.lessonId}`
                        );
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="">
                            <FileText />
                          </div>
                          <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-semibold">
                              {lesson.title.length > 20
                                ? lesson.title.slice(0, 20) + "..."
                                : lesson.title}
                            </h2>
                          </div>
                        </div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <EllipsisVertical
                              size={18}
                              className="cursor-pointer"
                            />
                          </PopoverTrigger>
                          <PopoverContent className="flex flex-col p-1 w-52 mr-10 sm:mr-16 lg:mr-28 rounded-[6px]">
                            <PopoverActionLesson
                              lesson={lesson}
                              courseId={props.params.coursId}
                              user={user}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-end">
                          <p className="text-sm text-muted-foreground">
                            mis à jour le :{" "}
                            {new Date(lesson.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-1 items-center flex-row-reverse justify-between">
                          <div className="flex flex-row-reverse items-center gap-1">
                            <Link
                              className="w-full grow"
                              href={`/courses/${props.params.coursId}/${lesson.lessonId}`}
                            >
                              <Button>Voir la leçon</Button>
                            </Link>
                            <Link
                              href={`/courses/${props.params.coursId}/${lesson.lessonId}/edit`}
                            >
                              <Button
                                variant="secondary"
                                size="icon"
                                className="p-3"
                              >
                                <Pencil />
                              </Button>
                            </Link>
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
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
                                    deleteMutation.mutate({
                                      id: lesson.lessonId,
                                    });
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
            ) : (
              <div className="w-full">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="max-sm:text-xs">Nom</TableHead>
                      <TableHead className="max-sm:text-xs">
                        Propriétaire
                      </TableHead>
                      <TableHead className="max-sm:text-xs">
                        Dernière modification
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  {lessons
                    ?.filter((lesson) =>
                      lesson.title
                        .toLowerCase()
                        .includes(search?.toLowerCase() ?? "")
                    )
                    .map((lesson) => (
                      <TableBody
                        className="max-sm:text-xs"
                        key={lesson.lessonId}
                      >
                        <TableRow>
                          <TableCell>
                            <Link
                              href={`/courses/${props.params.coursId}/${lesson.lessonId}`}
                            >
                              <span className="text-primary">
                                {lesson.title.length > 20
                                  ? lesson.title.slice(0, 20) + "..."
                                  : lesson.title}
                              </span>
                            </Link>
                          </TableCell>
                          <TableCell className="flex items-center gap-1 text-muted-foreground">
                            <Image
                              src={
                                lesson.author?.image
                                  ? lesson.author.image
                                  : "/user.png"
                              }
                              alt={"user image"}
                              width={20}
                              height={20}
                              className="rounded-full"
                            />

                            {lesson.author?.id === user?.user?.id
                              ? "Moi"
                              : lesson.author?.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(lesson.updatedAt).toLocaleDateString(
                              "fr-FR",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </TableCell>
                          <TableCell>
                            <Popover>
                              <PopoverTrigger asChild>
                                <EllipsisVertical
                                  size={18}
                                  className="cursor-pointer"
                                />
                              </PopoverTrigger>
                              <PopoverContent className="flex flex-col p-1 w-52 mr-10 sm:mr-16 lg:mr-28 rounded-[6px]">
                                <PopoverActionLesson
                                  lesson={lesson}
                                  courseId={props.params.coursId}
                                  user={user}
                                />
                              </PopoverContent>
                            </Popover>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))}
                </Table>
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
}
