import { requireCurrentUser } from "@/lib/auth/current-user";
import { Bell } from "lucide-react";
import Image from "next/image";
import { CalendarComponent } from "../Calendar";
import { Button } from "../ui/button";

export const Profile = async () => {
  const user = await requireCurrentUser();
  return (
    <div className="w-full h-full border p-7 bg-background">
      <header className="flex items-center justify-between">
        <h1 className="font-bold text-xl">Ton profil</h1>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
      </header>
      <div className="w-full py-5 flex flex-col space-y-5">
        <div className="flex flex-col justify-center items-center space-y-2">
          <div className="relative overflow-hidden rounded-full p-[10px] flex justify-center items-center">
            <div className="absolute inset-0 border-[5px] border-secondary rounded-full"></div>
            <Image
              src={user.image ? user.image : "/public/img/avatar.jpg"}
              alt="Profile picture"
              width={100}
              height={100}
              className="rounded-full relative z-20 cursor-pointer"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="font-bold text-lg">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div>
          <CalendarComponent />
        </div>
      </div>
    </div>
  );
};
