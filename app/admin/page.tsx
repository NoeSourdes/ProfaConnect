"use client";

import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const surname = session?.user?.name?.split(" ")[0];
  return (
    <div className="px-7 py-7">
      <div className="flex flex-col gap-1">
        <p className="text-xl font-bold">Bonjour {surname} 👋</p>
        <p className="text-muted-foreground">
          apprenons quelque chose de nouveau aujourd&apos;hui!
        </p>
      </div>
    </div>
  );
}
