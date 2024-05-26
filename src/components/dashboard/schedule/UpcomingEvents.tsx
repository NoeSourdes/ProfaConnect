"use client";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Calendar, EllipsisVertical, Pen, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { checkHour } from "./actions/hour";
import { getUpcomingEventAction } from "./actions/upcoming-event/upcomingEvent.action";

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
      <div className="flex justify-between border-b py-3 px-2 scroll-px-24">
        <div>
          <h2 className="flex items-center gap-3 text-sm font-medium">
            <Calendar size={20} />
            Événements à venir
          </h2>
        </div>
      </div>
      <div className="max-h-60 overflow-y-auto">
        {isLoading && <p>Chargement...</p>}
        {isError && <p>Erreur lors du chargement des événements</p>}
        {events && events.length === 0 && <p>Aucun événement à venir</p>}
        {events &&
          events.map((event, index) => (
            <div
              key={event.id}
              className={`flex items-center gap-2 pr-2 ${
                events.length - 1 === index ? "" : "border-b"
              } ${index === 0 ? "pt-2" : ""} ${
                index === events.length - 1 ? "pb-2" : "pb-2"
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
                      {checkHour(event.start)} - {checkHour(event.end)}
                    </p>
                  </div>
                  <Popover>
                    <PopoverTrigger>
                      <EllipsisVertical
                        size={20}
                        className="text-muted-foreground"
                      />
                    </PopoverTrigger>
                    <PopoverContent className="max-w-56 p-2">
                      <div className="flex flex-col gap-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="w-full flex items-center justify-start gap-2"
                              variant="ghost"
                            >
                              <Pen size={18} />
                              Modifier l'événement
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Modifier l'événement</DialogTitle>
                              <DialogDescription>
                                Modifiez le titre de l'événement
                              </DialogDescription>
                            </DialogHeader>
                            <div></div>
                          </DialogContent>
                        </Dialog>
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
