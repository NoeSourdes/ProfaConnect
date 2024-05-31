"use client";

import { Button } from "@/src/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Trash } from "lucide-react";
import { toast } from "sonner";
import {
  colorClasses15,
  colorClassesBorderClean,
  colorClassesClean,
} from "../actions/color";
import { deleteEventAction } from "../actions/events/event.action";
import { checkHour } from "../actions/hour";
import { EventType } from "../actions/types/events-type";
import { ModalEventForm } from "./ModalEventForm";

export type popoverManagementEventsProps = {
  event: EventType;
  onCalendar?: boolean;
};

export const PopoverManagementEvents = (
  props: popoverManagementEventsProps
) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (idEvent: { id: string }) => deleteEventAction(idEvent.id),
    onSuccess: ({ data, serverError }) => {
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("Événement supprimé avec succès");

      queryClient.invalidateQueries({
        queryKey: ["events", props.event.userId],
      });
    },
  });
  return (
    <div>
      <Popover>
        <PopoverTrigger className="w-full">
          {props.onCalendar ? (
            <div
              className={`${
                colorClasses15[props.event.color as keyof typeof colorClasses15]
              } w-full h-5 rounded p-1 flex items-center gap-1 max-sm:border-2 ${
                colorClassesBorderClean[
                  props.event.color as keyof typeof colorClassesBorderClean
                ]
              }`}
            >
              <div
                className={`${
                  colorClassesClean[
                    props.event.color as keyof typeof colorClassesClean
                  ]
                } w-1 h-full rounded max-sm:hidden`}
              ></div>

              <p className="text-muted-foreground w-full max-sm:text-[10px] text-start max-sm:text-center">
                {checkHour(props.event.startTime)}
              </p>
            </div>
          ) : (
            <EllipsisVertical size={20} className="text-muted-foreground" />
          )}
        </PopoverTrigger>
        <PopoverContent className="max-w-56 p-2 space-y-2 z-50">
          <div className="px-1">
            <div className="flex items-center gap-1 ">
              <span
                className={`w-1 h-4 ${
                  colorClassesClean[
                    props.event.color as keyof typeof colorClassesClean
                  ]
                }`}
              ></span>

              <p className="font-medium">{props.event.title}</p>
            </div>
            <p className="text-muted-foreground font-semibold text-xs">
              {checkHour(props.event.startTime)} -{" "}
              {checkHour(props.event.endTime)}
            </p>
            <p
              className="
            text-muted-foreground text-sm
            "
            >
              {props.event.description
                ? props.event.description
                : "Pas de description"}
            </p>
          </div>
          <ModalEventForm
            defaultValues={{
              ...props.event,
              description: props.event.description ?? undefined,
              categoryId: props.event.categoryId ?? undefined,
              start: JSON.parse(props.event.start),
              end: JSON.parse(props.event.end),
            }}
            id={props.event.id}
          />
          <div className="flex flex-col gap-3">
            <Button
              size="sm"
              className="w-full flex items-center justify-start gap-2 hover:text-destructive tramsition-colors"
              variant="ghost"
              onClick={() => {
                deleteMutation.mutate({ id: props.event.id });
              }}
            >
              <Trash size={18} />
              Supprimer l'événement
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
