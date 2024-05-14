"use client";

import { Footer } from "@/src/components/admin-panel/footer";
import { Navbar } from "@/src/components/admin-panel/navbar";
import { Sidebar } from "@/src/components/admin-panel/sidebar";
import { useFullScreen } from "@/src/components/dashboard/tiptap/fullScreen.store";
import { useSidebarToggle } from "@/src/hooks/use-sidebar-toggle";
import { useStore } from "@/src/hooks/use-store";
import { cn } from "@/src/lib/utils";

import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { isFullScreen, setIsFullScreen } = useFullScreen();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const sidebar = useStore(useSidebarToggle, (state) => state);
  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Navbar />
        <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
