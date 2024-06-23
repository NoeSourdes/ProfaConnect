import { useSession } from "next-auth/react";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { GlareCard } from "./ui/glare-card";

export function GlareCardComp() {
  const session = useSession();
  return (
    <GlareCard className="bg-secondary">
      <div className="absolute inset-0 rounded-[15px] border-4 dark:border-[#2E3E58] p-5 flex flex-col gap-3">
        <div className=" h-[230px] w-[280px] rounded-t-[200px] rounded-b-md relative overflow-hidden">
          <BackgroundGradientAnimation></BackgroundGradientAnimation>
        </div>
        <p className="font-bold text-2xl text-[#6C00A2]">
          {session.data?.user?.name}
        </p>
      </div>
    </GlareCard>
  );
}
