"use client";

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
import { format } from "date-fns";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  Loader2,
  Pen,
  Plus,
} from "lucide-react";
import { eventSchema, eventType } from "../actions/events/event.schema";

import { Calendar } from "@/src/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
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
import { useEffect, useState } from "react";
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
import {
  colorClasses,
  colorClassesBorder,
  colorClassesBorderClean,
  colors,
} from "../actions/color";
import {
  createEventAction,
  updateEventAction,
} from "../actions/events/event.action";
import { ButtonCreateCategoryPopover } from "./buttonCreateCategoryPopover";

export type ModalEventFormProps = {
  defaultValues?: eventType;
  id?: string;
  icon?: boolean;
};

export const ModalEventForm = (props: ModalEventFormProps) => {
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (date && date <= new Date(Date.now() - 86400000)) {
      toast.warning("La date de l'événement est passée !!");
    }
  }, [date]);
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

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: eventType) => {
      const startTime = `${values.start.hour}:${values.start.minute}`;
      const endTime = `${values.end.hour}:${values.end.minute}`;
      const start = JSON.stringify(values.start);
      const end = JSON.stringify(values.end);
      values = { ...values, startTime, endTime, start, end };
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
      const { data, serverError } = isCreate
        ? await createEventAction(values)
        : await updateEventAction({ id: props.id as string, data: values });
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success(
        isCreate
          ? "Événement créé avec succès"
          : "Événement mis à jour avec succès"
      );
      setOpen(false);
      return data;
    },
    onSuccess: (data) => {
      if (data && session?.user) {
        queryClient.setQueryData(
          ["events", session.user.id],
          (oldData: any[]) => {
            if (isCreate) {
              return [...(oldData as any[]), data];
            } else {
              return (oldData as any[]).map((event) =>
                event.id === data.id ? data : event
              );
            }
          }
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={isCreate ? (props.icon ? "icon_sm" : "default") : "sm"}
          variant={isCreate ? (props.icon ? "secondary" : "default") : "ghost"}
          className={
            isCreate
              ? props.icon
                ? ""
                : "w-full"
              : "w-full flex items-center justify-start gap-2 rounded"
          }
        >
          {isCreate ? (
            props.icon ? (
              <Plus size={18} />
            ) : (
              "Créer un événement"
            )
          ) : (
            <>
              <Pen size={18} />
              Modifier l'événement
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto sm:p-6 p-3 shadow-lg">
        <DialogHeader>
          <DialogTitle>Créer un événement</DialogTitle>
        </DialogHeader>
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
                    <PopoverContent
                      className="w-auto p-0 z-[50000]"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setDate(date);
                        }}
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
          <div className="flex flex-row-reverse max-sm:flex-col-reverse items-center gap-4 w-full justify-between">
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
                    <div className="flex space-x-3">
                      {colors.map((color) => (
                        <div
                          key={color}
                          className={`flex items-center justify-center border-[3px] p-[2px] rounded-full ${
                            selectedColor === color
                              ? `${colorClassesBorder[color]}`
                              : "border-transparent"
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full cursor-pointer  transition-all border-[3px] ${colorClassesBorderClean[color]} ${colorClasses[color]}`}
                            onClick={() => {
                              field.onChange(color);
                              setSelectedColor(color);
                            }}
                          />
                        </div>
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
          <Button type="submit" disabled={mutation.isPending}>
            {isCreate ? "Créer l'événement" : "Mettre à jour l'événement"}
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
