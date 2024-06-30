import { getUserProfileAction } from "@/actions/user/user";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getRoleFrench } from "../hooks/user-actions";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { GlareCard } from "./ui/glare-card";
import Particles from "./ui/particles";

export function GlareCardComp() {
  const session = useSession();
  const {
    data: userProfile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", session?.data?.user?.id ?? ""],
    queryFn: async () => {
      const userProfile = await getUserProfileAction(
        session?.data?.user?.id ?? ""
      );
      return userProfile;
    },
  });

  return (
    <GlareCard className="bg-secondary">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={`#5BBFC8`}
        refresh
      />
      <div className="absolute inset-0 rounded-[15px] border-4 dark:border-[#2E3E58] p-5 flex flex-col gap-3">
        <div className="min-h-[200px] max-h-[220px] w-[280px] rounded-t-[200px] rounded-b-md relative overflow-hidden">
          <BackgroundGradientAnimation></BackgroundGradientAnimation>
        </div>
        <div className="w-full h-full flex flex-col justify-between text-[#12374A]">
          <div>
            <p className="font-semibold text-2xl">{session.data?.user?.name}</p>
            <p className="font-medium">
              {getRoleFrench(userProfile?.data?.role ?? "")}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className=" text-xs flex items-center">
              <p className="border border-[#12374A] rounded-l px-1">
                ProfaConnect
              </p>
              <span className="w-4 bg-[#12374A]/50 h-[18px] border-t border-b border-[#12374A]"></span>
              <p className="border border-[#12374A] rounded-r px-1">
                21 Oct 2023
              </p>
            </div>
            <div>
              <Image
                src="/img/logo_card.svg"
                alt="ProfaConnect"
                width={32}
                height={32}
              />
            </div>
          </div>
        </div>
      </div>
    </GlareCard>
  );
}