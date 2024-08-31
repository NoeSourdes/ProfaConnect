"use client";

import { useQuery } from "@tanstack/react-query";
import { Calendar, EllipsisVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import { colorClassesClean } from "../../../../app/(admin)/schedule/color";
import { getEventAction } from "../../../../app/(admin)/schedule/events/event.action";
import { checkHour, sortEvents } from "../../../../app/(admin)/schedule/hour";
import { EventType } from "../../../../app/(admin)/schedule/types/events-type";
import { Skeleton } from "../../ui/skeleton";
import { ModalEventForm } from "./components/ModalEventForm";
import { PopoverManagementEvents } from "./components/popoverManagementEvents";

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
      const events = await getEventAction(session?.user?.id as string);
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
            <Calendar size={18} />
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
                  <EllipsisVertical size={18} />
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
          <div className=" p-3 m-2 text-center rounded">
            <p className="text-sm text-muted-foreground font-medium p-2">
              Aucun événement aujourd'hui
            </p>
            <ModalEventForm />
          </div>
        )}
        {todayEvents &&
          sortEvents(todayEvents).map((event: EventType, index: number) => (
            <div
              key={`${event.id}-${index}`}
              className={`flex items-center gap-2 pr-2 ${
                todayEvents.length - 1 === index ? "" : "border-b"
              } ${index === 0 ? "pt-2" : ""} ${
                index === todayEvents.length - 1 ? "pb-2" : "pb-2"
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
                      {checkHour(event.startTime)} - {checkHour(event.endTime)}
                    </p>
                  </div>
                  <PopoverManagementEvents event={event} />
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
