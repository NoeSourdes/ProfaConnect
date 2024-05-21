import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { Button } from "@/src/components/ui/button";
import type { LayoutParams } from "@/src/types/next";
import { Undo2 } from "lucide-react";
import Link from "next/link";

export default async function RouteLayout(props: LayoutParams<{}>) {
  return (
    <div>
      <div className="flex items-center justify-between gap-5 w-full">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button size="icon" variant="secondary">
              <Undo2 size={20} />
            </Button>
          </Link>
          <BreadcrumbComponent
            array={[
              { item: "Home", link: "/" },
              { item: "Calendrier", link: "/schedule" },
            ]}
          />
        </div>
      </div>
      <div className="w-full h-full flex justify-between ">
        <section className="mt-5 pt-2 w-full h-full border-t">
          {props.children}
        </section>
      </div>
    </div>
  );
}
