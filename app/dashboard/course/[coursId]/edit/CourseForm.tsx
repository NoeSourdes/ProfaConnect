"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCourseAction } from "./course.actions";
import { CourseType, courseSchema } from "./course.schema";

export type CourseFormProps = {
  defaultValues?: CourseType;
};

export const CourseForm = (props: CourseFormProps) => {
  const form = useZodForm({
    schema: courseSchema,
    defaultValues: props.defaultValues,
  });
  const isCreate = !Boolean(props.defaultValues);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: CourseType) => {
      const { data, serverError } = await createCourseAction(values);

      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("Le cours a été créé avec succès");
      router.push(`/dashboard/courses/${data.id}`);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isCreate
            ? "Créer un cours"
            : "Modifier le cours" + props.defaultValues?.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                    placeholder="
                  Entrez le titre du cours"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Le titre du cours doit être court et descriptif.
                </FormDescription>
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
                  <Input
                    placeholder="
                  Entrez la description du cours"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  La description du cours doit être détaillée.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>{isCreate ? "Créer le cours" : "Modifier le cours"}</Button>
        </Form>
      </CardContent>
    </Card>
  );
};
