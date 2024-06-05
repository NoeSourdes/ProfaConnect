"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Ellipsis } from "lucide-react";
import moment from "moment";
import "moment/locale/fr";
import { useEffect, useState } from "react";
import { colorClasses15, colorClassesBorderClean } from "../actions/color";
import { checkHour, sortEvents } from "../actions/hour";
import { EventType } from "../actions/types/events-type";
import { PopoverManagementEvents } from "./popoverManagementEvents";

export type CalendarMonthProps = {
  year: number;
  month: number;
  events: EventType[];
};

export const CalendarMonth = (props: CalendarMonthProps) => {
  const list_weeks_days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const currentDay = moment().day();

  const [allDays, setAllDays] = useState<moment.Moment[]>([]);

  useEffect(() => {
    const start = moment([props.year, props.month - 1]);
    const end = moment(start).endOf("month");

    const days = [];
    let day = moment(start).startOf("week");

    while (day.isBefore(end.endOf("week"))) {
      days.push(moment(day));
      day.add(1, "day");
    }

    setAllDays(days);
  }, [props.year, props.month]);

  const isToday = (date: moment.Moment) => {
    return date.isSame(moment(), "day");
  };

  return (
    <div className="w-full h-full space-y-2 bg-transparent">
      <section>
        <div className="flex justify-between">
          {list_weeks_days.map((day, index) => (
            <div
              key={day}
              className={`text-xs font-medium text-muted-foreground w-full h-full flex items-center justify-center ${
                currentDay === index + 1 ? "text-primary" : ""
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </section>
      <section className="bg-background">
        <div className="grid grid-cols-7 gap-0">
          {allDays.map((day, index) => {
            const isCurrentMonth = day.month() === props.month - 1;
            const isTodayClass = isToday(day)
              ? "text-background bg-primary p-1 rounded-full"
              : "mt-1";
            const isFirstRow = index < 7;
            const isLastRow = index >= allDays.length - 7;
            const isFirstColumn = index % 7 === 0;
            const isLastColumn = index % 7 === 6;
            const eventsForDay = props.events.filter((event) =>
              moment(event.date).isSame(day, "day")
            );

            let borderRadiusClass = "";
            if (isFirstRow && isFirstColumn)
              borderRadiusClass = "rounded-tl-lg";
            if (isFirstRow && isLastColumn) borderRadiusClass = "rounded-tr-lg";
            if (isLastRow && isFirstColumn) borderRadiusClass = "rounded-bl-lg";
            if (isLastRow && isLastColumn) borderRadiusClass = "rounded-br-lg";

            return (
              <div
                key={day.toISOString()}
                className={`text-xs font-medium w-full h-32 flex items-center justify-start border-t border-l flex-col gap-1 px-2 ${
                  isCurrentMonth ? "" : "text-muted-foreground/50"
                } ${index % 7 === 6 ? "border-r" : ""} ${
                  index >= allDays.length - 7 ? "border-b" : ""
                } ${borderRadiusClass}`}
              >
                <div
                  className={`${isTodayClass} mt-1 rounded cursor-pointer w-5 h-5 flex items-center justify-center transition-all ${
                    !isToday(day) ? "hover:bg-secondary" : ""
                  }`}
                >
                  {day.format("D")}
                </div>
                {sortEvents(eventsForDay)
                  .slice(0, 3)
                  .map((event: EventType) => (
                    <div key={event.id} className={`w-full`}>
                      <PopoverManagementEvents event={event} onCalendar />
                    </div>
                  ))}
                {eventsForDay.length > 3 && (
                  <div className="w-full">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Ellipsis
                          size={20}
                          className="cursor-pointer w-full flex justify-center items-center"
                        />
                      </PopoverTrigger>
                      <PopoverContent className="w-80 h-80 overflow-y-auto p-3 z-40">
                        <div className="grid gap-3">
                          {sortEvents(eventsForDay).map((event: EventType) => (
                            <div
                              key={event.id}
                              className={`flex items-center border-2 p-2 rounded-md justify-between ${
                                colorClassesBorderClean[
                                  event.color as keyof typeof colorClassesBorderClean
                                ]
                              } ${
                                colorClasses15[
                                  event.color as keyof typeof colorClasses15
                                ]
                              }`}
                            >
                              <div className="flex flex-col gap-1">
                                <p className="text-muted-foreground text-sm">
                                  {event.title}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                  {checkHour(event.startTime)} -{" "}
                                  {checkHour(event.endTime)}
                                </p>
                              </div>
                              <PopoverManagementEvents event={event} />
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
