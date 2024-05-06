import { BreadcrumbComponent } from "@/components/dashboard/Breadcrumb";
import type { PageParams } from "@/types/next";
import { CourseForm } from "../[coursId]/edit/CourseForm";

export default function RoutePage(props: PageParams<{}>) {
  return (
    <div className="p-7 h-full w-full">
      <main className="flex flex-1 flex-col gap-4 lg:gap-6 h-full">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">
            Création d'un nouveau cours
          </h1>
        </div>
        <BreadcrumbComponent
          array={[
            {
              item: "Dashboard",
              link: "/dashboard",
            },
            {
              item: "Cours",
              link: "/dashboard/courses",
            },
            {
              item: "Nouveau cours",
              link: "/dashboard/courses/new_course",
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
