"use client";

import { getUserProfileAction } from "@/actions/user/user";
import { Footer } from "@/src/components/admin-panel/footer";
import { Navbar } from "@/src/components/admin-panel/navbar";
import { Sidebar } from "@/src/components/admin-panel/sidebar";
import { Onboarding } from "@/src/components/dashboard/onbording/Onbording";
import { Button } from "@/src/components/ui/button";
import { useSidebarToggle } from "@/src/hooks/use-sidebar-toggle";
import { useStore } from "@/src/hooks/use-store";
import { cn } from "@/src/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const session = useSession();
  const router = useRouter();

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

  if (isLoading) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-transparence z-[5000]"></div>
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

  return (
    <div className="relative">
      <Button
        onClick={() => {
          router.push("/profaBot");
        }}
        size="icon"
        variant="ghost"
        className={cn(
          "group fixed bottom-6 right-6 z-[123456] size-10 overflow-hidden border hover:bg-background ",
          "rounded-full shadow-md hover:shadow-lg",
          "transition-all duration-300 ease-in-out hover:w-[245px]"
        )}
        data-block-hide
      >
        <div className="flex size-full items-center justify-start gap-2">
          <Image
            src="/svg/star.svg"
            alt="logo star ai"
            width={30}
            height={30}
            layout="fixed"
            className="pl-1.5"
          />
          <span
            className={cn(
              "whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out bg-[linear-gradient(120deg,#6EB6F2_10%,#a855f7,#ea580c,#eab308)] bg-clip-text text-transparent",
              "group-hover:translate-x-0 group-hover:opacity-100",
              "-translate-x-2"
            )}
          >
            Demander l'aide de ProfaBot
          </span>
        </div>
      </Button>
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
