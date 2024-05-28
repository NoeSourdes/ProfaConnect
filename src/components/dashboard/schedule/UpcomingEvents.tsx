"use client";

import { Button } from "@/src/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Calendar, EllipsisVertical, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Skeleton } from "../../ui/skeleton";
import { checkHour } from "./actions/hour";
import { getUpcomingEventAction } from "./actions/upcoming-event/upcomingEvent.action";
import { ModalEventForm } from "./components/ModalEventForm";

export type UpcomingEventsProps = {};

export const UpcomingEvents = (props: UpcomingEventsProps) => {
  const { data: session } = useSession();
  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events", session?.user?.id],
    queryFn: async () => {
      const events = await getUpcomingEventAction(session?.user?.id as string);
      return events;
    },
  });

  const today = new Date();
  const todayEvents = events?.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === today.getDate() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getFullYear() === today.getFullYear()
    );
  });

  const descriptionMaxLength = (description: string | null | undefined) => {
    if (!description) {
      return "";
    }
    if (description.length > 50) {
      return (
        description.substring(0, 30) +
        "<br>" +
        description.substring(30, 50) +
        "..."
      );
    }
    if (description.length > 30) {
      return description.substring(0, 30) + "<br>" + description.substring(30);
    }
    return description;
  };
  return (
    <div className="border rounded-lg w-full">
      <div className="flex justify-between border-b py-2 px-2 scroll-px-24">
        <div className="flex items-center justify-between w-full">
          <h2 className="flex items-center gap-3 text-sm font-medium">
            <Calendar size={20} />
            Événements à venir
          </h2>
          <ModalEventForm icon={true} />
        </div>
      </div>
      <div className="max-h-60 overflow-y-auto">
        {isLoading && (
          <div className="flex flex-col gap-3 w-full p-2">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 w-full"
                >
                  <div className="flex items-center gap-2 w-full">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="w-1/2 h-4" />
                  </div>
                  <EllipsisVertical size={20} />
                </div>
              ))}
          </div>
        )}
        {isError && (
          <p className="text-sm text-muted-foreground font-medium p-2">
            Erreur lors du chargement des événements
          </p>
        )}
        {todayEvents && todayEvents.length === 0 && (
          <p className="text-sm text-muted-foreground font-medium p-2">
            Aucun événement à venir
          </p>
        )}
        {todayEvents &&
          todayEvents.map((event, index) => (
            <div
              key={`${event.id}-${index}`}
              className={`flex items-center gap-2 pr-2 ${
                todayEvents.length - 1 === index ? "" : "border-b"
              } ${index === 0 ? "pt-2" : ""} ${
                index === todayEvents.length - 1 ? "pb-2" : "pb-2"
              } py-2 hover:bg-secondary transition-colors cursor-pointer pl-2`}
            >
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full bg-${
                        event.color || "novel-highlight-purple"
                      }`}
                    ></span>
                    <p className="text-sm text-muted-foreground">
                      {checkHour(event.startTime)} - {checkHour(event.endTime)}
                    </p>
                  </div>
                  <Popover>
                    <PopoverTrigger>
                      <EllipsisVertical
                        size={20}
                        className="text-muted-foreground"
                      />
                    </PopoverTrigger>
                    <PopoverContent className="max-w-56 p-2 space-y-2 z-50">
                      <ModalEventForm
                        defaultValues={{
                          ...event,
                          description: event.description ?? undefined,
                          categoryId: event.categoryId ?? undefined,
                          start: JSON.parse(event.start),
                          end: JSON.parse(event.end),
                        }}
                        id={event.id}
                      />
                      <div className="flex flex-col gap-3">
                        <Button
                          size="sm"
                          className="w-full flex items-center justify-start gap-2 hover:text-destructive tramsition-colors"
                          variant="ghost"
                          onClick={() => {
                            console.log("delete");
                          }}
                        >
                          <Trash size={18} />
                          Supprimer l'événement
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <h3 className="text-sm font-medium">{event.title}</h3>
                  <p
                    className="text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{
                      __html: descriptionMaxLength(event.description as string),
                    }}
                  ></p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
