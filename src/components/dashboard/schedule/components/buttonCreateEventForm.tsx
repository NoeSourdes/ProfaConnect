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
import { getCategoriesAction } from "../actions/category/category.action";
import { createEventAction } from "../actions/create-event/create-event.action";

export type ButtonCreateEventFormProps = {
  defaultValues?: eventType;
};

export const ButtonCreateEventForm = (props: ButtonCreateEventFormProps) => {
  const form = useZodForm({
    schema: eventSchema,
    defaultValues: props.defaultValues,
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
  const colors = [
    "novel-highlight-purple",
    "novel-highlight-red",
    "novel-highlight-yellow",
    "novel-highlight-blue",
    "novel-highlight-green",
  ];

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
                      <div className="flex flex-row gap-4 w-full">
                        {colors.map((color) => (
                          <div
                            key={color}
                            onClick={() => field.onChange(color)}
                            className={cn(
                              "w-5 h-5 rounded-full cursor-pointer",
                              `bg-${color}`
                            )}
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
            <Button type="submit" disabled={mutation.isPending}>
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
