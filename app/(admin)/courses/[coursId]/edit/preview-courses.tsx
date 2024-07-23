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
import { requiredCurrentUser } from "@/src/lib/auth/current-user";
import { prisma } from "@/src/lib/prisma";
import type { PageParams } from "@/src/types/next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FolderOpen, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteCourseAction } from "../../../../../actions/admin/courses/course.actions";

export default async function PreviewComponent(props: PageParams<{}>) {
  const router = useRouter();
  const user = await requiredCurrentUser();
  const queryClient = useQueryClient();

  const WhereInput = {
    authorId: user?.id,
  };

  const courses = await prisma.course.findMany({
    where: WhereInput,
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      updatedAt: true,
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
        queryKey: ["courses", user?.id ? user.id : ""],
      });
    },
  });

  return (
    <>
      <div className="w-full flex flex-wrap gap-4">
        {courses?.map((course) => (
          <div
            key={course.id}
            className="h-48 sm:max-w-80 grow flex flex-col p-4 justify-between border rounded-2xl shadow-lg hover:ring ring-primary/70 cursor-pointer transition-all hover:shadow-blue"
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
                  {new Date(course.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-row-reverse gap-1 items-center justify-between">
                <div className="flex flex-row-reverse items-center gap-1">
                  <Link className="w-full grow" href={`courses/${course.id}`}>
                    <Button>Voir le cours</Button>
                  </Link>
                  <Link href={`courses/${course.id}/edit`}>
                    <Button variant="secondary" size="icon" className="p-3">
                      <Pencil />
                    </Button>
                  </Link>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="p-3">
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Supprimer le cours</AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer le cours, et toutes
                        les leçons associées à {course.title} ?
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
    </>
  );
}
