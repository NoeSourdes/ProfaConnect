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
import { addDays, format } from "date-fns";
import { ArrowRight, Calendar as CalendarIcon } from "lucide-react";
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
import { useState } from "react";

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
        <CredenzaBody className="space-y-4 pb-4 text-center text-sm sm:pb-0 sm:text-left">
          <Form
            className="flex flex-col gap-4"
            form={form}
            onSubmit={async (values) => {
              console.log(values);
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
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                        <Select
                          onValueChange={(value) =>
                            setDate(addDays(new Date(), parseInt(value)))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="0">Today</SelectItem>
                            <SelectItem value="1">Tomorrow</SelectItem>
                            <SelectItem value="3">In 3 days</SelectItem>
                            <SelectItem value="7">In a week</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="rounded-md border">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                          />
                        </div>
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
                      <TimePicker />
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
                      <TimePicker />
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
                      <Input
                        placeholder="
                  Entrez la couleur de l'événement"
                        {...field}
                      />
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
                    <FormLabel>
                      Catégorie de l'événement{" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup>
                            <SelectItem value="1">Option 1</SelectItem>
                            <SelectItem value="2">Option 2</SelectItem>
                            <SelectItem value="3">Option 3</SelectItem>
                            <SelectItem value="4">Option 4</SelectItem>
                            <SelectItem value="5">Option 5</SelectItem>
                            <SelectItem value="6">Option 6</SelectItem>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>
              {isCreate ? "Créer l'événement" : "Mettre à jour l'événement"}
            </Button>
          </Form>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
};
