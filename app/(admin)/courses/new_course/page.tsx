import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import type { PageParams } from "@/src/types/next";
import { CourseForm } from "../[coursId]/edit/CourseForm";

export default function RoutePage(props: PageParams<{}>) {
  return (
    <div className="h-full w-full">
      <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
        <BreadcrumbComponent
          array={[
            {
              item: "Dashboard",
              link: "/dashboard",
            },
            {
              item: "Cours",
              link: "/courses",
            },
            {
              item: "Nouveau cours",
              link: "/courses/new_course",
            },
          ]}
        />
        <div
          className="h-full w-full rounded-lg"
          x-chunk="dashboard-02-chunk-1"
        >
          <CourseForm />
        </div>
      </main>
    </div>
  );
}
