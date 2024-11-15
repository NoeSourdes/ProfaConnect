import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { Button } from "@/src/components/ui/button";
import { Undo2 } from "lucide-react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{}>;
}

export default async function RouteLayout({ children }: LayoutProps) {
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between gap-5 w-full">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button size="icon" variant="outline">
              <Undo2 size={18} />
            </Button>
          </Link>
          <BreadcrumbComponent
            array={[{ item: "Messagerie", link: "/messaging" }]}
          />
        </div>
      </div>
      <div className="w-full h-full flex justify-between">
        <section className="w-full h-full">{children}</section>
      </div>
    </div>
  );
}
