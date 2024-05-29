import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { requiredCurrentUser } from "@/src/lib/auth/current-user";

export default async function Page() {
  const user = await requiredCurrentUser();
  const surname = user?.name?.split(" ")[0];
  return (
    <>
      <BreadcrumbComponent
        array={[
          {
            item: "Dashboard",
            link: "/dashboard",
          },
        ]}
      />
      <div className="w-full h-full flex justify-between">
        <section className="flex flex-col gap-1 pt-5">
          <p className="text-xl font-bold">Bonjour {surname} 👋</p>
          <p className="text-muted-foreground">
            apprenons quelque chose de nouveau aujourd&apos;hui !
          </p>
        </section>
      </div>
    </>
  );
}
