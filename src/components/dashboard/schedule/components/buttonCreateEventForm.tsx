"use client";

import { Button } from "@/src/components/ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/src/components/ui/credenza";
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
import { format } from "date-fns";
import { ArrowRight, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import {
  eventSchema,
  eventType,
} from "../actions/create-event/create-event.schema";

import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { TimePicker } from "@/src/components/ui/time-picker";
import { cn } from "@/src/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fr } from "date-fns/locale";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { TimeValue } from "react-aria";
import { toast } from "sonner";
import {
  checkNameCategoryAction,
  createCategoryAction,
  getCategoriesAction,
} from "../actions/category/category.action";
import {
  categorySchema,
  categoryType,
} from "../actions/category/category.schema";
import { createEventAction } from "../actions/create-event/create-event.action";
import { ButtonCreateCategoryPopover } from "./buttonCreateCategoryPopover";

export type ButtonCreateEventFormProps = {
  defaultValues?: eventType;
};

export const ButtonCreateEventForm = (props: ButtonCreateEventFormProps) => {
  const form = useZodForm({
    schema: eventSchema,
    defaultValues: props.defaultValues,
  });

  const formCategory = useZodForm({
    schema: categorySchema,
  });

  const isCreate = !Boolean(props.defaultValues);
  const [date, setDate] = useState<Date>();
  const { data: session } = useSession();

  const {
    data: categories,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["categories", session?.user?.id],
    queryFn: async () => {
      const categories = await getCategoriesAction(session?.user?.id as string);
      return categories;
    },
  });
  const colors: Array<
    | "novel-highlight-purple"
    | "novel-highlight-red"
    | "novel-highlight-yellow"
    | "novel-highlight-blue"
    | "novel-highlight-green"
  > = [
    "novel-highlight-purple",
    "novel-highlight-red",
    "novel-highlight-yellow",
    "novel-highlight-blue",
    "novel-highlight-green",
  ];

  const colorClasses: Record<(typeof colors)[number], string> = {
    "novel-highlight-purple": "bg-novel-highlight-purple",
    "novel-highlight-red": "bg-novel-highlight-red",
    "novel-highlight-yellow": "bg-novel-highlight-yellow",
    "novel-highlight-blue": "bg-novel-highlight-blue",
    "novel-highlight-green": "bg-novel-highlight-green",
  };

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: eventType) => {
      const start = `${values.start.hour}:${values.start.minute}`;
      const end = `${values.end.hour}:${values.end.minute}`;
      values = { ...values, start, end };
      if (values.start > values.end) {
        toast.error("L'heure de début doit être avant l'heure de fin");
      }
      if (values.start === values.end) {
        toast.error("L'heure de début ne peut pas être égale à l'heure de fin");
      }
      if (typeof values.start !== "string") {
        return;
      }
      if (typeof values.end !== "string") {
        return;
      }
      console.log(values);
      const { data, serverError } = await createEventAction(values);
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("L'événement a été créé avec succès");
      return data;
    },
    onSuccess: (data) => {
      if (data && session?.user) {
        queryClient.setQueryData(
          ["events", session.user.id],
          (oldData: any[]) => [...(oldData as any[]), data]
        );
      }
    },
  });

  const handleCheckNameCategory = async (name: string, userId: string) => {
    return await checkNameCategoryAction(name, userId);
  };

  const mutationCategory = useMutation({
    mutationFn: async (values: categoryType) => {
      const check = await handleCheckNameCategory(
        values.name,
        session?.user?.id as string
      );
      if (check) {
        toast.error("Le nom de la catégorie existe déjà");
        return;
      }
      const { data, serverError } = await createCategoryAction(values);
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("Catégorie ajoutée avec succès");
      return data;
    },
    onSuccess: (data) => {
      if (data && session?.user) {
        queryClient.setQueryData(
          ["categories", session.user.id],
          (oldData: any[]) => [...(oldData as any[]), data]
        );
      }
    },
  });

  const formId = "create-event-form";
  const formIdCategory = "create-category-form";

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button size="lg" className="w-full">
          Créer un événement
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Créer un événement</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
          <Form
            id={formId}
            className="flex flex-col gap-4"
            form={form}
            onSubmit={async (values) => {
              mutation.mutate(values);
            }}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Titre de l'événement{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="
                  Entrez le titre de l'événement"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Date de l'événement{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP", { locale: fr })
                          ) : (
                            <span>Choisissez une date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-4 w-full justify-between">
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Heure de début
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl className="w-full">
                      <TimePicker
                        granularity="minute"
                        value={
                          field.value as unknown as TimeValue | null | undefined
                        }
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ArrowRight size={50} className="mt-7" />
              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Heure de fin
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl className="w-full">
                      <TimePicker
                        value={
                          field.value as unknown as TimeValue | null | undefined
                        }
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row-reverse items-center gap-4 w-full justify-between">
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Couleur de l'événement{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex space-x-5">
                        {colors.map((color) => (
                          <div
                            key={color}
                            className={`w-6 h-6 rounded-full cursor-pointer hover:ring-[3px] hover:ring-muted-foreground/50 transition-all ${
                              colorClasses[color]
                            } ${
                              selectedColor === color
                                ? "ring-[3px] ring-muted-foreground/50"
                                : ""
                            }`}
                            onClick={() => {
                              field.onChange(color);
                              setSelectedColor(color);
                            }}
                          />
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Catégorie de l'événement </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selectionner" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup className="space-y-2">
                            {categories?.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={String(category.id)}
                              >
                                {category.name}
                              </SelectItem>
                            ))}

                            <div
                              className={`flex items-center justify-center gap-3 py-2 text-muted-foreground text-sm font-medium ${
                                categories?.length === 0 ? "" : "border-t"
                              }`}
                            >
                              <ButtonCreateCategoryPopover
                                categories={categories}
                                formCategory={formCategory}
                                formIdCategory={formIdCategory}
                                mutationCategory={mutationCategory}
                              />
                            </div>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description de l'événement</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="
                  Entrez la description de l'événement"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={mutation.isPending} form={formId}>
              {isCreate ? "Créer l'événement" : "Mettre à jour l'événement"}
              {mutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </Form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};
