"use client";

import { deleteCourseAction } from "@/app/(admin)/courses/[coursId]/edit/course.actions";
import { CourseType } from "@/app/(admin)/courses/[coursId]/edit/course.schema";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, FolderPen, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../../ui/button";

export type PopoverActionCourseProps = {
  course: CourseType;
  user: any;
};

export const PopoverActionCourse = (props: PopoverActionCourseProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (idCourse: { id: string }) => deleteCourseAction(idCourse.id),
    onSuccess: ({ data, serverError }) => {
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("Le cours a été supprimé avec succès");

      queryClient.invalidateQueries({
        queryKey: ["courses", props.user?.user?.id ? props.user.user.id : ""],
      });
    },
  });

  return (
    <>
      {[
        {
          icon: <ExternalLink size={18} />,
          text: "Ouvrir le cours",
          action: () => {
            router.push(`/courses/${props.course.id}`);
          },
          name: "open",
        },
        {
          icon: <FolderPen size={18} />,
          text: "Renommer",
          action: null,
          name: "rename",
        },
        {
          icon: <Pen size={18} />,
          text: "Modifier",
          action: () => {
            router.push(`/courses/${props.course.id}/edit`);
          },
          name: "edit",
        },
        {
          icon: <Trash size={18} />,
          text: "Supprimer le cours",
          action: () => {
            deleteMutation.mutate({ id: props.course.id });
          },
          name: "delete",
        },
      ].map((button, index) => (
        <Dialog key={index}>
          {button.name === "rename" ? (
            <DialogTrigger asChild>
              <Button
                className={`flex justify-start items-center gap-2 pl-2 rounded`}
                variant="ghost"
              >
                {button.icon}
                {button.text}
              </Button>
            </DialogTrigger>
          ) : (
            <Button
              className={`flex justify-start items-center gap-2 pl-2 rounded transition-all ${
                button.name === "delete" ? "hover:text-destructive" : ""
              }`}
              variant="ghost"
              onClick={() => {
                if (button.action) {
                  button.action();
                }
              }}
            >
              {button.icon}
              {button.text}
            </Button>
          )}
          {button.text === "Renommer" && (
            <DialogContent className="p-6 space-y-4">
              <DialogHeader>
                <DialogTitle>Renommer le cours</DialogTitle>
              </DialogHeader>

              <Input
                id="name"
                defaultValue={props.course.title}
                className="col-span-3"
              />

              <DialogFooter>
                <Button variant="ghost">Annuler</Button>
                <Button type="submit">Renommer</Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      ))}
    </>
  );
};
