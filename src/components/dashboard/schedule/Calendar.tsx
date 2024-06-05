"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { monthNames } from "./actions/calendar/calendar";
import { getEventAction } from "./actions/events/event.action";
import { CalendarDay } from "./components/CalendarDay";
import { CalendarMonth } from "./components/CalendarMonth";
import { CalendarWeek } from "./components/CalendarWeek";
import { ListEvents } from "./components/ListEvents";

export type CalendarProps = {
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (value: boolean) => void;
};

export const FullCalendarComponent = (props: CalendarProps) => {
  const [date, setDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");
  const [years, setYears] = useState<number>(new Date().getFullYear());
  const [months, setMonths] = useState<number>(new Date().getMonth() + 1);

  const { data: session } = useSession();

  // month
  const handlePrevMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)));
    setMonths(months - 1);
    if (months === 1) {
      setYears(years - 1);
      setMonths(12);
    }
  };

  const handleNextMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)));
    setMonths(months + 1);
    if (months === 12) {
      setYears(years + 1);
      setMonths(1);
    }
  };

  // week

  const handlePrevWeek = () => {
    setDate(new Date(date.setDate(date.getDate() - 7)));
    if (date.getMonth() + 1 !== months) {
      setMonths(date.getMonth() + 1);
    }
  };

  const handleNextWeek = () => {
    setDate(new Date(date.setDate(date.getDate() + 7)));
    if (date.getMonth() + 1 !== months) {
      setMonths(date.getMonth() + 1);
    }
  };

  // day

  const handlePrevDay = () => {
    setDate(new Date(date.setDate(date.getDate() - 1)));
    if (date.getMonth() + 1 !== months) {
      setMonths(date.getMonth() + 1);
    }
  };

  const handleNextDay = () => {
    setDate(new Date(date.setDate(date.getDate() + 1)));
    if (date.getMonth() + 1 !== months) {
      setMonths(date.getMonth() + 1);
    }
  };

  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events", session?.user?.id],
    queryFn: async () => {
      const events = await getEventAction(session?.user?.id as string);
      return events;
    },
  });

  return (
    <div>
      <Tabs
        defaultValue={currentView}
        onValueChange={(value) => setCurrentView(value)}
      >
        <TabsList className="flex max-md:flex-col max-md:items-start items-center justify-between gap-3 w-full p-0 bg-transparent">
          <div className="flex items-center gap-2 w-full">
            <div className="flex items-center gap-3 max-md:w-full max-sm:justify-between">
              <Button
                onClick={() => {
                  setDate(new Date());
                  setMonths(new Date().getMonth() + 1);
                  setYears(new Date().getFullYear());
                }}
                variant="secondary"
              >
                Ajourd'hui
              </Button>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    if (currentView === "month") {
                      handlePrevMonth();
                    } else if (currentView === "week") {
                      handlePrevWeek();
                    }
                    if (currentView === "day") {
                      handlePrevDay();
                    }
                    if (currentView === "list") {
                      handlePrevMonth();
                    }
                  }}
                  size="icon_sm"
                  variant="ghost"
                >
                  <ChevronLeft />
                </Button>
                <div>
                  {currentView === "month" && (
                    <span className="font-medium">
                      {monthNames[date.getMonth()]} {date.getFullYear()}
                    </span>
                  )}
                  {currentView === "week" && (
                    <span className="font-medium">
                      {format(
                        startOfWeek(date, { weekStartsOn: 1 }),
                        "MMMM d",
                        { locale: fr }
                      )}{" "}
                      -{" "}
                      {format(endOfWeek(date, { weekStartsOn: 1 }), "d, yyyy", {
                        locale: fr,
                      })}
                    </span>
                  )}
                  {currentView === "day" && (
                    <span className="font-medium">
                      {format(date, "d MMMM, yyyy", { locale: fr })}
                    </span>
                  )}
                  {currentView === "list" && (
                    <span className="font-medium">
                      {monthNames[date.getMonth()]} {date.getFullYear()}
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => {
                    if (currentView === "month") {
                      handleNextMonth();
                    } else if (currentView === "week") {
                      handleNextWeek();
                    }
                    if (currentView === "day") {
                      handleNextDay();
                    }
                    if (currentView === "list") {
                      handleNextMonth();
                    }
                  }}
                  size="icon_sm"
                  variant="ghost"
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
          <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground mr-2 max-md:w-full">
            <TabsTrigger className="max-md:grow" value="month">
              Mois
            </TabsTrigger>
            <TabsTrigger className="max-md:grow" value="week">
              Semaine
            </TabsTrigger>
            <TabsTrigger className="max-md:grow" value="day">
              Jour
            </TabsTrigger>
            <TabsTrigger className="max-md:grow" value="list">
              Liste
            </TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="month" className="mt-3 max-md:mt-[68px]">
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0">
              <CalendarMonth year={years} month={months} events={events} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="week" className="mt-3 max-md:mt-[68px]">
          <div className="w-full h-full">
            <CalendarWeek date={date} events={events} />
          </div>
        </TabsContent>
        <TabsContent value="day" className="mt-3 max-md:mt-[68px]">
          <div className="w-full h-full">
            <CalendarDay date={date} events={events} />
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-3 max-md:mt-[68px]">
          <div className="w-full h-full">
            <ListEvents
              events={events}
              isLoading={isLoading}
              isError={isError}
              date={date}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
