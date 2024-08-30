"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  checkTitleCourseAction,
  createCourseAction,
  updateCourseAction,
} from "../../../../../actions/admin/courses/course.actions";
import {
  CreateCourseType,
  createCourseSchema,
} from "../../../../../actions/admin/courses/course.schema";

export type CourseFormProps = {
  defaultValues?: CreateCourseType;
  courseId?: string;
};

export const CourseForm = (props: CourseFormProps) => {
  const form = useZodForm({
    schema: createCourseSchema,
    defaultValues: props.defaultValues,
  });
  const isCreate = !Boolean(props.defaultValues);
  const router = useRouter();
  const pathname = usePathname();
  const lastSlashIndex = pathname.lastIndexOf("/");
  const newPathname = pathname.substring(0, lastSlashIndex) + "/";
  console.log(newPathname);

  const mutation = useMutation({
    mutationFn: async (values: CreateCourseType) => {
      const checkTitle = await checkTitleCourseAction(values.title);
      if (checkTitle) {
        toast.error("Le titre du cours est déjà utilisé");
        return;
      }
      const { data, serverError } = isCreate
        ? await createCourseAction(values)
        : await updateCourseAction({
            id: String(props.courseId),
            data: values,
          });

      if (serverError || !data) {
        throw new Error(serverError);
      }
      isCreate
        ? toast.success("Le cours a été créé avec succès")
        : toast.success("Le cours a été modifié avec succès");
      router.push(newPathname + data.id);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isCreate ? (
            <span>Création d'un nouveau cours</span>
          ) : (
            <span>
              Modifier le cours{" "}
              <span className="text-primary">{props.defaultValues?.title}</span>
            </span>
          )}
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
                  <Textarea
                    className="resize-none"
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
