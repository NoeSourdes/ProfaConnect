"use client";

import { FullCalendarComponent } from "@/src/components/dashboard/schedule/Calendar";
import { UpcomingEvents } from "@/src/components/dashboard/schedule/UpcomingEvents";
import { Categories } from "@/src/components/dashboard/schedule/category";
import { ModalEventForm } from "@/src/components/dashboard/schedule/components/ModalEventForm";
import { Calendar } from "@/src/components/ui/calendar";
import { useState } from "react";

export default function TimeStamp() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <div
      className={`min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] h-full w-full flex gap-3 relative max-lg:flex-col`}
    >
      <section className={`flex flex-col gap-3 transition-all z-30 pt-3`}>
        <ModalEventForm />
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border bg-background"
        />
        <div className="bg-background">
          <UpcomingEvents />
        </div>
        <div className="bg-background">
          <Categories />
        </div>
        <div></div>
      </section>
      <section className={`h-full w-full transition-all z-10 pt-3`}>
        <FullCalendarComponent
          setSidebarIsOpen={setSidebarIsOpen}
          sidebarIsOpen={sidebarIsOpen}
        />
      </section>
    </div>
  );
}
