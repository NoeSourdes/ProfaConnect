"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export function CommentAvatar({ userId }: { userId: null | string }) {
  const user = useSession();

  if (!user) return null;

  return (
    // <div className="flex items-center gap-1">
    //   <Avatar className="size-5">
    //     <AvatarImage
    //       alt={user.data?.user?.image ?? ""}
    //       src={user.data?.user?.image ?? ""}
    //     />
    //     <AvatarFallback>{user.data?.user?.name ?? ""}</AvatarFallback>
    //   </Avatar>
    //   <p className="text-sm font-medium">
    //     {user.data?.user?.name?.split(" ")[0] ?? ""}
    //   </p>
    // </div>
    <Avatar className="size-5">
      <AvatarImage
        alt={user.data?.user?.image ?? ""}
        src={user.data?.user?.image ?? ""}
      />
      <AvatarFallback>{user.data?.user?.name ?? ""}</AvatarFallback>
    </Avatar>
  );
}
