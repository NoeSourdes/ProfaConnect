"use client";

import {
  deleteCourseAction,
  renameCourseAction,
} from "@/app/(admin)/courses/[coursId]/edit/course.actions";
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
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, FolderPen, Loader2, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";

export type PopoverActionCourseProps = {
  course: CourseType;
  user: any;
};

export const PopoverActionCourse = (props: PopoverActionCourseProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [newNameCourse, setNewNameCourse] = useState("");
  const [open, setOpen] = useState(false);

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

  const { mutate: mutationupdateNameCourse, isPending } = useMutation({
    mutationFn: (data: { id: string; name: string }) =>
      renameCourseAction({ id: data.id, name: data.name }),
    onSuccess: ({ data, serverError }) => {
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("Le cours a été renommé avec succès");
      setOpen(false);

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
        <Dialog key={index} open={open} onOpenChange={setOpen}>
          {button.name === "rename" ? (
            <DialogTrigger asChild>
              <Button
                className={`flex justify-start items-center gap-2 pl-2 rounded`}
                variant="ghost"
                onClick={() => {
                  setOpen(true);
                }}
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
            <DialogContent className="p-6 shadow-lg">
              <div className="flex flex-col gap-4">
                <DialogHeader>
                  <DialogTitle>Renommer le cours</DialogTitle>
                </DialogHeader>

                <Input
                  id="name"
                  defaultValue={props.course.title}
                  className="col-span-3"
                  onChange={(e) => {
                    setNewNameCourse(e.target.value);
                  }}
                />

                <DialogFooter>
                  <DialogClose>
                    <Button variant="ghost">Annuler</Button>
                  </DialogClose>
                  <Button
                    disabled={isPending}
                    onClick={() => {
                      mutationupdateNameCourse({
                        id: props.course.id,
                        name: newNameCourse,
                      });
                    }}
                    type="submit"
                  >
                    {isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Renommer
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          )}
        </Dialog>
      ))}
    </>
  );
};
