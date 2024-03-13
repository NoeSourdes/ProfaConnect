import React from "react";
import { Sidebar } from "./components/layout/Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="relative flex transition-all">
      <div className="fixed top-0 bottom-0 w-sideBar border-r bg-background">
        <Sidebar />
      </div>
      <div className="fixed inset-0 left-[260px]">{children}</div>
    </div>
  );
}
