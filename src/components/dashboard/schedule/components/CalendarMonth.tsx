"use client";

import moment from "moment";
import "moment/locale/fr";
import { useEffect, useState } from "react";

export type CalendarMonthProps = {
  year: number;
  month: number;
};

export const CalendarMonth = ({ year, month }: CalendarMonthProps) => {
  const list_weeks_days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const currentDay = moment().day();

  const [allDays, setAllDays] = useState<moment.Moment[]>([]);

  useEffect(() => {
    const start = moment([year, month - 1]);
    const end = moment(start).endOf("month");

    const days = [];
    let day = moment(start).startOf("week");

    while (day.isBefore(end.endOf("week"))) {
      days.push(moment(day));
      day.add(1, "day");
    }

    setAllDays(days);
  }, [year, month]);

  const isToday = (date: moment.Moment) => {
    return date.isSame(moment(), "day");
  };

  return (
    <div className="w-full h-full space-y-2">
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
      <section>
        <div className="grid grid-cols-7 gap-0">
          {allDays.map((day, index) => {
            const isCurrentMonth = day.month() === month - 1;
            const isTodayClass = isToday(day) ? "bg-secondary" : "";
            const isFirstRow = index < 7;
            const isLastRow = index >= allDays.length - 7;
            const isFirstColumn = index % 7 === 0;
            const isLastColumn = index % 7 === 6;

            let borderRadiusClass = "";
            if (isFirstRow && isFirstColumn)
              borderRadiusClass = "rounded-tl-lg";
            if (isFirstRow && isLastColumn) borderRadiusClass = "rounded-tr-lg";
            if (isLastRow && isFirstColumn) borderRadiusClass = "rounded-bl-lg";
            if (isLastRow && isLastColumn) borderRadiusClass = "rounded-br-lg";

            return (
              <div
                key={day.toISOString()}
                className={`text-xs font-medium w-full h-32 flex items-start justify-center border-t border-l p-2 ${
                  isCurrentMonth ? "" : "text-muted-foreground/50"
                } ${index % 7 === 6 ? "border-r" : ""} ${
                  index >= allDays.length - 7 ? "border-b" : ""
                } ${borderRadiusClass} ${isTodayClass}`}
              >
                {day.format("D")}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
