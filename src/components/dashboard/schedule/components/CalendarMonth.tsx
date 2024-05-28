"use client";

import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  subDays,
} from "date-fns";
import { fr } from "date-fns/locale";
import { useEffect, useState } from "react";

export type CalendarMonthProps = {
  year: number;
  month: number;
};

export const CalendarMonth = ({ year, month }: CalendarMonthProps) => {
  const list_weeks_days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const current_week_day = new Date().getDay();
  const currentDay = current_week_day === 0 ? 7 : current_week_day;

  const [allDays, setAllDays] = useState<Date[]>([]);

  useEffect(() => {
    const start = startOfMonth(new Date(year, month - 1));
    const end = endOfMonth(new Date(year, month - 1));
    const days = eachDayOfInterval({ start, end });

    const startDayOfWeek = start.getDay() === 0 ? 7 : start.getDay();
    const daysFromPrevMonth = startDayOfWeek - 1;
    const prevMonthDays = eachDayOfInterval({
      start: subDays(start, daysFromPrevMonth),
      end: subDays(start, 1),
    });

    const endDayOfWeek = end.getDay() === 0 ? 7 : end.getDay();
    const daysFromNextMonth = 7 - endDayOfWeek;
    const nextMonthDays = eachDayOfInterval({
      start: addDays(end, 1),
      end: addDays(end, daysFromNextMonth),
    });

    setAllDays([...prevMonthDays, ...days, ...nextMonthDays]);
  }, [year, month]);

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
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
            const isCurrentMonth = day.getMonth() === month - 1;
            const isTodayClass = isToday(day) ? "bg-secondary" : " ";
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
                {format(day, "d", { locale: fr })}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
