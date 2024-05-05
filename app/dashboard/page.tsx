import { Profile } from "@/components/dashboard/Profile";
import { requiredCurrentUser } from "@/lib/auth/current-user";

export default async function Page() {
  const user = await requiredCurrentUser();
  const surname = user?.name?.split(" ")[0];
  return (
    <div className="w-full h-full flex justify-between">
      <section className="flex flex-col gap-1 p-7">
        <p className="text-xl font-bold">Bonjour {surname} 👋</p>
        <p className="text-muted-foreground">
          apprenons quelque chose de nouveau aujourd&apos;hui !
        </p>
      </section>
      {/* section Profile */}
      <section className="max-w-sm w-full">
        <Profile />
      </section>
    </div>
  );
}
