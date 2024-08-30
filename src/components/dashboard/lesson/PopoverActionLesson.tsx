"use client";

import {
  deleteLessonAction,
  renameLessonAction,
} from "@/actions/admin/lessons/lesson.action";
import { lessonTypeGlobal } from "@/actions/admin/lessons/lesson.schema";
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/src/components/expenssion/modal-responsive";
import { Input } from "@/src/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, FolderPen, Loader2, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";

export type PopoverActionLessonProps = {
  lesson: lessonTypeGlobal;
  courseId: string;
  user: any;
};

export const PopoverActionLesson = (props: PopoverActionLessonProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [newNameCourse, setNewNameCourse] = useState("");
  const [open, setOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: (idLesson: { id: string }) => deleteLessonAction(idLesson.id),
    onSuccess: ({ data, serverError }) => {
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("La leçon a été supprimée avec succès");

      queryClient.invalidateQueries({
        queryKey: ["lessons", props.user?.user?.id ? props.user.user.id : ""],
      });
    },
  });

  const { mutate: mutationupdateNameLesson, isPending } = useMutation({
    mutationFn: (data: { id: string; name: string }) =>
      renameLessonAction({ id: data.id, name: data.name }),
    onSuccess: ({ data, serverError }) => {
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("La leçon a été renommée avec succès");
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
            router.push(
              `/documents/${props.courseId}/${props.lesson.lessonId}`
            );
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
            router.push(
              `/documents/${props.courseId}/${props.lesson.lessonId}/edit`
            );
          },
          name: "edit",
        },
        {
          icon: <Trash size={18} />,
          text: "Supprimer le cours",
          action: () => {
            deleteMutation.mutate({ id: props.lesson.lessonId });
          },
          name: "delete",
        },
      ].map((button, index) => (
        <ResponsiveModal open={open} onOpenChange={setOpen} key={index}>
          {button.name === "rename" ? (
            <ResponsiveModalTrigger asChild>
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
            </ResponsiveModalTrigger>
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
            <ResponsiveModalContent className="p-6 shadow-lg">
              <div className="flex flex-col gap-4">
                <ResponsiveModalHeader>
                  <ResponsiveModalTitle>
                    Renommer la lesson
                  </ResponsiveModalTitle>
                </ResponsiveModalHeader>

                <Input
                  id="name"
                  defaultValue={props.lesson.title}
                  className="col-span-3"
                  onChange={(e) => {
                    setNewNameCourse(e.target.value);
                  }}
                />

                <ResponsiveModalFooter>
                  <ResponsiveModalClose>
                    <Button variant="ghost">Annuler</Button>
                  </ResponsiveModalClose>
                  <Button
                    disabled={isPending}
                    onClick={() => {
                      mutationupdateNameLesson({
                        id: props.lesson.lessonId,
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
                </ResponsiveModalFooter>
              </div>
            </ResponsiveModalContent>
          )}
        </ResponsiveModal>
      ))}
    </>
  );
};
