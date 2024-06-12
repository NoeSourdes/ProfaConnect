"use client";

import { getUserProfileAction } from "@/actions/user/user";
import { Footer } from "@/src/components/admin-panel/footer";
import { Navbar } from "@/src/components/admin-panel/navbar";
import { Sidebar } from "@/src/components/admin-panel/sidebar";
import { Onboarding } from "@/src/components/dashboard/Onbording";
import { useSidebarToggle } from "@/src/hooks/use-sidebar-toggle";
import { useStore } from "@/src/hooks/use-store";
import { cn } from "@/src/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const session = useSession();

  const {
    data: userProfile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile", session.data?.user?.id],
    queryFn: async () => {
      const userProfile = await getUserProfileAction(
        session.data?.user?.id as string
      );
      return userProfile;
    },
  });

  return (
    <div className="">
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false
            ? "max-[1200px]:ml-0 ml-[90px]"
            : "max-[1200px]:ml-0 ml-72"
        )}
      >
        <Navbar />
        {userProfile?.data?.onboarded === false && (
          <Onboarding userProfile={userProfile.data} />
        )}
        <div className="container py-5 px-5 max-[1200px]:p-4 z-50">
          {children}
        </div>
      </main>

      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false
            ? "max-[1200px]:ml-0 ml-[90px]"
            : "max-[1200px]:ml-0 ml-72"
        )}
      >
        <Footer />
      </footer>
    </div>
  );
}
