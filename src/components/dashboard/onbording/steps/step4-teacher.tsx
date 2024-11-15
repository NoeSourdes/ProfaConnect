"use client";

import {
  createClassroomAction,
  deleteClassroomAction,
  getAllClassroomsAction,
} from "@/actions/admin/classroom/classroom.actions";
import {
  CreateClassroomType,
  createClassroomSchema,
} from "@/actions/admin/classroom/classroom.schema";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HTMLMotionProps, motion } from "framer-motion";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export type Step4TeacherProps = {
  direction: number;
  variants: any;
};

export const Step4Teacher = (props: Step4TeacherProps) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const form = useZodForm({
    schema: createClassroomSchema,
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const {
    data: classroom,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["classroom", "all"],
    queryFn: async () => {
      const classroom = await getAllClassroomsAction();
      return classroom;
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: CreateClassroomType) => {
      const { data, serverError } = await createClassroomAction(values);

      if (serverError || !data) {
        throw new Error(serverError);
      }

      return data;
    },
    onSuccess: () => {
      form.reset();
      toast.success("La classe a été créée avec succès !");
      queryClient.invalidateQueries({
        queryKey: ["classroom", "all"],
      });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: async (classroomId: string) => {
      const { data, serverError } = await deleteClassroomAction(classroomId);

      if (serverError || !data) {
        throw new Error(serverError);
      }

      return data;
    },
    onSuccess: () => {
      form.reset();
      toast.success("La classe a été supprimée avec succès !");
      queryClient.invalidateQueries({
        queryKey: ["classroom", "all"],
      });
    },
  });

  const MotionDiv = motion.div as React.ComponentType<
    HTMLMotionProps<"div"> & { className?: string }
  >;

  return (
    <MotionDiv
      key="step-4"
      exit="exit"
      custom={props.direction}
      variants={props.variants}
      initial="enter"
      animate="center"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      className="w-full space-y-2 h-full flex flex-col mt-3 overflow-y-auto px-1"
    >
      <h4 className="font-medium text-sm">
        Souhaitez-vous créer des classes ? (Optionnel)
      </h4>
      <div>
        <Form
          className="flex flex-col gap-4"
          form={form}
          onSubmit={async (values) => {
            await mutation.mutateAsync(values);
          }}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Entrez le titre de la classe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Entrez la description de la classe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Créer la classe</Button>
        </Form>
      </div>
      {classroom?.length !== 0 && (
        <div className="">
          <h4 className="font-medium text-sm mb-2 mt-2">Vos classes :</h4>
          <div className="flex flex-col gap-2">
            {classroom?.map((classroom: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">{classroom.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {classroom.description}
                  </p>
                </div>
                <div>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 justify-start"
                    onClick={() => {
                      mutationDelete.mutateAsync(classroom.idClassroom);
                    }}
                  >
                    <Trash /> Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </MotionDiv>
  );
};
