"use client";

import { FullCalendarComponent } from "@/src/components/dashboard/schedule/Calendar";
import { UpcomingEvents } from "@/src/components/dashboard/schedule/UpcomingEvents";
import { Categories } from "@/src/components/dashboard/schedule/category";
import { ButtonCreateEventForm } from "@/src/components/dashboard/schedule/components/buttonCreateEventForm";
import { Calendar } from "@/src/components/ui/calendar";
import { useState } from "react";

export default function TimeStamp() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <div
      className={`min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] w-full flex gap-3 relative overflow-hidden ${
        sidebarIsOpen ? "border rounded-md shadow-lg" : ""
      }`}
    >
      <div
        onClick={() => setSidebarIsOpen(false)}
        className={`absolute inset-0 bg-black/25 z-20 rounded-md shadow-xl cursor-pointer transition-all ${
          sidebarIsOpen ? "opacity-1" : "opacity-0 pointer-events-none"
        }`}
      ></div>
      <section
        className={`flex flex-col gap-3 max-[900px]:-translate-x-[19rem] transition-all bg-background z-30 pt-3 ${
          sidebarIsOpen
            ? "max-[900px]:translate-x-0 px-3"
            : "max-[900px]:-translate-x-[19rem]"
        }`}
      >
        <ButtonCreateEventForm />
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
      <section
        className={`h-full absolute max-[900px]:left-0 left-[18rem] right-0 transition-all z-10 pt-3`}
      >
        <FullCalendarComponent
          setSidebarIsOpen={setSidebarIsOpen}
          sidebarIsOpen={sidebarIsOpen}
        />
      </section>
    </div>
  );
}
