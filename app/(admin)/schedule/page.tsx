"use client";

import { FullCalendarComponent } from "@/src/components/dashboard/schedule/Calendar";
import { UpcomingEvents } from "@/src/components/dashboard/schedule/UpcomingEvents";
import { Categories } from "@/src/components/dashboard/schedule/category";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import { useState } from "react";

export default function TimeStamp() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="h-full w-full flex gap-3">
      <section className="flex flex-col gap-3 h-full">
        <div>
          <Button size="lg" className="w-full">
            Créer un événement
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <UpcomingEvents />
        <Categories />
        <div></div>
      </section>
      <section className="grow w-full h-full">
        <FullCalendarComponent />
      </section>
    </div>
  );
}
