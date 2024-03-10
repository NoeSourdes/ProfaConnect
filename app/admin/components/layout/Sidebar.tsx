import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChartBig,
  CalendarDays,
  FolderOpenDot,
  Gamepad2,
  LayoutDashboard,
  MessageCircleMore,
  Settings,
} from "lucide-react";

import Image from "next/image";

export const Sidebar = () => {
  return (
    <div className="h-full w-full p-7">
      <div className="space-y-10 flex flex-col justify-between h-full">
        <div className="space-y-10">
          <div className="flex items-center gap-3">
            <Image
              src="/img/logo-profaconnect.png"
              alt="Logo Profaconnect"
              width={40}
              height={40}
            />
            <h1 className="text-xl font-semibold">ProfaConnect</h1>
          </div>
          <div className="space-y-3">
            <Button
              size="lg_sideBar"
              className="w-full flex justify-start items-center gap-2"
            >
              <LayoutDashboard />
              Home
            </Button>
            <Button
              variant="hover_sideBar"
              size="lg_sideBar"
              className="w-full flex justify-start items-center gap-2 text-muted-foreground"
            >
              <FolderOpenDot />
              Cours
            </Button>
            <Button
              variant="hover_sideBar"
              size="lg_sideBar"
              className="w-full flex justify-start items-center gap-2 text-muted-foreground"
            >
              <CalendarDays />
              Emplois du temps
            </Button>
            <Button
              variant="hover_sideBar"
              size="lg_sideBar"
              className="w-full flex justify-start items-center gap-2 text-muted-foreground"
            >
              <MessageCircleMore />
              Communication
            </Button>
            <Button
              variant="hover_sideBar"
              size="lg_sideBar"
              className="w-full flex justify-start items-center gap-2 text-muted-foreground"
            >
              <Gamepad2 />
              Mini jeux
            </Button>
            <Button
              variant="hover_sideBar"
              size="lg_sideBar"
              className="w-full flex justify-start items-center gap-2 text-muted-foreground"
            >
              <BarChartBig />
              Notes
            </Button>
            <Button
              variant="hover_sideBar"
              size="lg_sideBar"
              className="w-full flex justify-start items-center gap-2 text-muted-foreground"
            >
              <Settings />
              Paramètres
            </Button>
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
