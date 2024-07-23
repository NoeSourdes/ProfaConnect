"use client";

import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const surname = session?.user?.name?.split(" ")[0];

  return (
    <>
      <BreadcrumbComponent
        array={[
          {
            item: "Dashboard",
            link: "/dashboard",
          },
        ]}
      />
      <div className="w-full h-full flex justify-between">
        <section className="flex flex-col gap-1 pt-5">
          <p className="text-xl font-bold">Bonjour {surname} 👋</p>
          <p className="text-muted-foreground">
            apprenons quelque chose de nouveau aujourd&apos;hui !
          </p>
        </section>
      </div>
    </>
  );
}
