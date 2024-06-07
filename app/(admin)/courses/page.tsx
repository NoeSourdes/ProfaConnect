"use client";

import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { PopoverActionCourse } from "@/src/components/dashboard/courses/PopoverActionCourse";
import { ViewSelect } from "@/src/components/dashboard/courses/ViewSelect";
import { useViewSelect } from "@/src/components/dashboard/courses/viewSelect.store";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CirclePlus,
  EllipsisVertical,
  FolderOpen,
  Pencil,
  SlidersHorizontal,
  Trash2,
  Undo2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  deleteCourseAction,
  getUserCourses,
} from "./[coursId]/edit/course.actions";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Course() {
  const { data: user } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 100);
  const { view } = useViewSelect();

  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses", user?.user?.id ? user.user.id : ""],
    queryFn: async () => {
      const courses = await getUserCourses(user?.user?.id ? user.user.id : "");
      return courses.map((course) => ({
        ...course,
        published: course.published ?? false,
      }));
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
        <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
          <div className="flex items-center gap-3 w-full">
            <Link href="/dashboard">
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
          <div className="flex items-center gap-3 w-full">
            <Link href="/dashboard">
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
              ]}
            />
          </div>
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
          <div className="flex items-center gap-3 w-full">
            <Link href="/dashboard">
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
              ]}
            />
          </div>
          <Card className="rounded-lg shadow-none border-dashed mt-5">
            <CardContent className="p-6 bg-transparent">
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
        <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
          <div className="flex items-center justify-between gap-5 w-full">
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
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
                ]}
              />
            </div>
            <ViewSelect />
          </div>
          <div className="h-full w-full space-y-5">
            <div className="flex gap-3">
              <Link href="/courses/new_course">
                <Button className="flex items-center gap-2">
                  {" "}
                  <CirclePlus />
                  <span className="sm:block hidden">Créer un cours</span>
                </Button>
              </Link>
              <Popover>
                <PopoverTrigger>
                  <Button variant="outline">
                    <SlidersHorizontal size={18} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="text-warning font-medium">
                  En cours de développement
                </PopoverContent>
              </Popover>

              <Input
                defaultValue={search}
                className="w-full max-w-96"
                type="text"
                id="search"
                placeholder="Rechercher un cours"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-wrap gap-4">
              {courses?.filter((course) =>
                course.title.toLowerCase().includes(search?.toLowerCase() ?? "")
              ).length === 0 && (
                <div className="">
                  <h3 className="text-xl font-medium text-muted-foreground">
                    Aucun cours trouvé
                  </h3>
                </div>
              )}
              <div className="w-full">
                {view === "grid_view" ? (
                  <div className="w-full flex flex-wrap gap-4">
                    {courses
                      ?.filter((course) =>
                        course.title
                          .toLowerCase()
                          .includes(search?.toLowerCase() ?? "")
                      )
                      .map((course) => (
                        <div
                          key={course.id}
                          className="h-48 sm:max-w-80 grow flex flex-col p-4 justify-between border rounded-2xl shadow-lg hover:ring ring-primary/70 cursor-pointer transition-all hover:shadow-blue bg-background"
                          onDoubleClick={() => {
                            router.push(`/courses/${course.id}`);
                          }}
                        >
                          <div>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <div className="">
                                  <FolderOpen />
                                </div>
                                <h2 className="text-lg font-semibold">
                                  {course.title.length > 20
                                    ? course.title.slice(0, 20) + "..."
                                    : course.title}
                                </h2>
                              </div>
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
                                {new Date(
                                  course.updatedAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex flex-row-reverse gap-1 items-center justify-between">
                              <div className="flex flex-row-reverse items-center gap-1">
                                <Link
                                  className="w-full grow"
                                  href={`courses/${course.id}`}
                                >
                                  <Button>Voir le cours</Button>
                                </Link>
                                <Link href={`courses/${course.id}/edit`}>
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
                                      Supprimer le cours
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Êtes-vous sûr de vouloir supprimer le
                                      cours, et toutes les leçons associées à{" "}
                                      {course.title} ?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Annuler
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-destructive hover:bg-destructive/90"
                                      onClick={() => {
                                        deleteMutation.mutate({
                                          id: course.id,
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
                      ))}{" "}
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
                      <TableBody className="max-sm:text-xs">
                        {courses
                          ?.filter((course) =>
                            course.title
                              .toLowerCase()
                              .includes(search?.toLowerCase() ?? "")
                          )
                          .map((course) => (
                            <TableRow key={course.id}>
                              <TableCell>
                                <Link href={`/courses/${course.id}`}>
                                  <span className="text-primary">
                                    {course.title.length > 20
                                      ? course.title.slice(0, 20) + "..."
                                      : course.title}
                                  </span>
                                </Link>
                              </TableCell>
                              <TableCell className="flex items-center gap-1 text-muted-foreground">
                                <Image
                                  src={
                                    course.author?.image
                                      ? course.author.image
                                      : "/user.png"
                                  }
                                  alt={"user image"}
                                  width={20}
                                  height={20}
                                  className="rounded-full"
                                />

                                {course.authorId === user?.user?.id
                                  ? "Moi"
                                  : course.author?.name}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {new Date(course.updatedAt).toLocaleDateString(
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
                                    <PopoverActionCourse
                                      course={course}
                                      user={user}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
