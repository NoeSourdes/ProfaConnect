"use client";

import React from "react";
import { Sidebar } from "./components/layout/Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  return (
    <div className="relative flex transition-all">
      <div
        className={`fixed top-0 bottom-0 bg-background z-20 transition-all ${
          isSidebarOpen ? "w-sideBar" : "w-sideBarResponsive"
        }`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <div
        className={`fixed inset-0 transition-all z-10 ${
          isSidebarOpen ? "left-[260px]" : "left-[76px]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
