import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import type { LayoutParams } from "@/src/types/next";

export default async function RouteLayout(props: LayoutParams<{}>) {
  return (
    <>
      <BreadcrumbComponent
        array={[
          { item: "Home", link: "/" },
          { item: "Calendrier", link: "/schedule" },
        ]}
      />
      <div className="w-full h-full flex justify-between ">
        <section className="mt-5 pt-5 w-full h-full border-t">
          {props.children}
        </section>
      </div>
    </>
  );
}
