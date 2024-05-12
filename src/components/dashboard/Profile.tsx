import { baseAuth } from "@/src/lib/auth/auth";
import { requiredCurrentUser } from "@/src/lib/auth/current-user";
import Image from "next/image";
import { CalendarComponent } from "../Calendar";

export const Profile = async () => {
  const session = await baseAuth();
  const user = await requiredCurrentUser();
  return (
    <div className="w-full h-full pt-5">
      <div className="w-full flex flex-col space-y-5">
        <div className="flex flex-col justify-center items-center space-y-2">
          <div className="relative overflow-hidden rounded-full flex justify-center items-center">
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
