"use client";

import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { Button } from "@/src/components/ui/button";
import { Undo2 } from "lucide-react";
import Link from "next/link";

export default function Game() {
  return (
    <div className="flex items-center gap-3">
      <Link href="/dashboard">
        <Button size="icon" variant="outline">
          <Undo2 size={18} />
        </Button>
      </Link>
      <BreadcrumbComponent array={[{ item: "Mini-jeux", link: "/games" }]} />
    </div>
  );
}
