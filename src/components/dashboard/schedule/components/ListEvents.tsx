"use client";

import { Skeleton } from "@/src/components/ui/skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { EllipsisVertical } from "lucide-react";
import { colorClassesClean } from "../actions/color";
import { checkHour, sortEventsByDate } from "../actions/hour";
import { EventType } from "../actions/types/events-type";
import { PopoverManagementEvents } from "./popoverManagementEvents";

export type ListEventsProps = {
  events: EventType[];
  isLoading: boolean;
  isError: boolean;
  date: Date;
};

export const ListEvents = (props: ListEventsProps) => {
  const eventsMonth = props.events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getMonth() === props.date.getMonth() &&
      eventDate.getFullYear() === props.date.getFullYear()
    );
  });

  let lastDate = "";

  return (
    <div className="h-full w-full">
      <section className="pb-2">
        <div className="flex justify-center ml-10 max-sm:ml-9">
          <div
            className={`text-xs font-medium w-full h-full flex items-center justify-center text-primary`}
          >
            {props.date.toLocaleString("fr-FR", { month: "long" })}{" "}
          </div>
        </div>
      </section>
      <div className="border rounded-lg w-full overflow-hidden bg-background">
        <div className=" max-h-[638px] min-h-[638px] overflow-y-auto">
          {props.isLoading && (
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
                    <EllipsisVertical size={18} />
                  </div>
                ))}
            </div>
          )}
          {props.isError && (
            <p className="text-sm text-muted-foreground font-medium p-2">
              Erreur lors du chargement des événements
            </p>
          )}
          {eventsMonth && eventsMonth.length === 0 && (
            <p className="text-sm text-muted-foreground font-medium p-2">
              Aucun événement à venir
            </p>
          )}
          {eventsMonth &&
            sortEventsByDate(eventsMonth).map(
              (event: EventType, index: number) => {
                const eventDate = format(new Date(event.date), "d MMMM yyyy", {
                  locale: fr,
                });
                const showDate = eventDate !== lastDate;
                if (showDate) {
                  lastDate = eventDate;
                }
                return (
                  <div key={`${event.id}-${index}`}>
                    {showDate && (
                      <div className="text-xs font-medium w-full h-full flex items-center text-primary py-1 pl-2 bg-secondary">
                        {eventDate}
                      </div>
                    )}
                    <div
                      className={`flex items-center gap-2 pr-2 ${
                        eventsMonth.length - 1 === index ? "" : "border-b"
                      } ${index === 0 ? "pt-2" : ""} ${
                        index === eventsMonth.length - 1 ? "pb-2" : "pb-2"
                      } py-2 pl-2`}
                    >
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                colorClassesClean[
                                  event.color as keyof typeof colorClassesClean
                                ]
                              }`}
                            ></span>
                            <p className="text-sm text-muted-foreground">
                              {checkHour(event.startTime)} -{" "}
                              {checkHour(event.endTime)}
                            </p>
                          </div>
                          <PopoverManagementEvents event={event} />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">{event.title}</h3>
                          <p className="text-sm text-muted-foreground"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
        </div>
      </div>
    </div>
  );
};
