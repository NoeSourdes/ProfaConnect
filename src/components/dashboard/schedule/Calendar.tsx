"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { monthNames } from "./actions/calendar/calendar";

export type CalendarProps = {
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (value: boolean) => void;
};

export const FullCalendarComponent = (props: CalendarProps) => {
  const [date, setDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");

  const handlePrevMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)));
  };

  return (
    <div>
      <Tabs
        defaultValue={currentView}
        onValueChange={(value) => setCurrentView(value)}
      >
        <TabsList className="flex max-md:flex-col max-md:items-start items-center justify-between gap-3 w-full bg-background">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3">
              <Button variant="secondary">Ajourd'hui</Button>
              <Button onClick={handlePrevMonth} size="icon_sm" variant="ghost">
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
                    {format(startOfWeek(date), "MMMM d", { locale: fr })} -{" "}
                    {format(endOfWeek(date), "d, yyyy", { locale: fr })}
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
              <Button onClick={handleNextMonth} size="icon_sm" variant="ghost">
                <ChevronRight />
              </Button>
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
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="week" className="mt-3 max-md:mt-[68px]">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="day" className="mt-3 max-md:mt-[68px]">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged
                out.dwqdqergreege
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="list" className="mt-3 max-md:mt-[68px]">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
