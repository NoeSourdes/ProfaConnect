"use client";

import { CourseType } from "@/actions/admin/courses/course.schema";
import {
  CirclePlus,
  EllipsisVertical,
  FolderOpen,
  Pencil,
  Trash2,
  Undo2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
} from "../../ui/alert-dialog";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { BreadcrumbComponent } from "../Breadcrumb";
import { PopoverActionCourse } from "./PopoverActionCourse";
import { ViewSelect } from "./ViewSelect";

interface IsSuccessComponentProps {
  courses: any;
  user: any;
  deleteMutation: any;
  view: any;
  search: any;
  setSearch: any;
}

export default function IsSuccessComponent({
  courses,
  user,
  deleteMutation,
  view,
  search,
  setSearch,
}: IsSuccessComponentProps) {
  const router = useRouter();
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
                  item: "Mes documents",
                  link: "/documents",
                },
              ]}
            />
          </div>
          <Card className="rounded-lg shadow-none border-dashed mt-5">
            <CardContent className="p-6 pb-7 bg-transparent">
              <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                <div className="flex flex-col relative">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                      Vous n'avez pas encore de cours ni de leçons
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Créez un cours ou une leçon pour commencer à partagez
                    </p>
                    <div className="flex items-center gap-5">
                      <Link href="/documents/new_course">
                        <Button className="mt-4">Créer un cours</Button>
                      </Link>
                      <Link href="/documents/new_lesson">
                        <Button className="mt-4">Créer une leçon</Button>
                      </Link>
                    </div>
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
                    item: "Mes documents",
                    link: "/documents",
                  },
                ]}
              />
            </div>
            <ViewSelect />
          </div>
          <div className="h-full w-full space-y-5">
            <div className="flex gap-3">
              <Link href="/documents/new_course">
                <Button className="flex items-center gap-2">
                  {" "}
                  <CirclePlus />
                  <span className="sm:block hidden">Nouveau</span>
                </Button>
              </Link>
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
              {courses?.filter((course: CourseType) =>
                course.title.toLowerCase().includes(search?.toLowerCase() ?? "")
              ).length === 0 && (
                <Card className="rounded-lg shadow-none border-dashed w-full">
                  <CardContent className="p-6 pb-7 bg-transparent">
                    <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                      <div className="flex flex-col relative">
                        <div className="flex flex-col items-center gap-1 text-center">
                          <h3 className="text-2xl font-bold tracking-tight">
                            Aucun cours trouvé pour cette recherche
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Créez un cours pour commencer à enseigner.
                          </p>
                          <Link href="/documents/new_course">
                            <Button className="mt-4">Nouveau</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              <div className="w-full">
                {view === "grid_view" ? (
                  <div className="w-full flex flex-wrap gap-4">
                    {courses
                      ?.filter((course: CourseType) =>
                        course.title
                          .toLowerCase()
                          .includes(search?.toLowerCase() ?? "")
                      )
                      .map((course: CourseType) => (
                        <div
                          key={course.id}
                          className="h-48 sm:max-w-80 grow flex flex-col p-4 justify-between border rounded-2xl shadow-lg hover:ring ring-primary/70 cursor-pointer transition-all hover:shadow-blue bg-background"
                          onDoubleClick={() => {
                            router.push(`/documents/${course.id}`);
                          }}
                        >
                          <div>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center justify-between gap-2">
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
                                  href={`documents/${course.id}`}
                                >
                                  <Button>Voir le cours</Button>
                                </Link>
                                <Link href={`documents/${course.id}/edit`}>
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
                      {courses
                        ?.filter((course: CourseType) =>
                          course.title
                            .toLowerCase()
                            .includes(search?.toLowerCase() ?? "")
                        )
                        .map((course: CourseType) => (
                          <TableBody className="max-sm:text-xs" key={course.id}>
                            <TableRow>
                              <TableCell>
                                <Link href={`/documents/${course.id}`}>
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

                                {course.author?.id === user?.user?.id
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
                          </TableBody>
                        ))}
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
