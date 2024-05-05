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
          onSubmit={async (value) => {
            console.log(value);
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
          <Button type="submit" className="">
            {isCreate ? "Créer le cours" : "Modifier le cours"}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};
