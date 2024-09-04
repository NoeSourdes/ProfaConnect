"use client";

import { useGetInfo } from "@/src/hooks/documents/use-get-info";

export const ComponentInfo = () => {
  const { isOpenModalInfo } = useGetInfo();

  return (
    <div className="flex h-full gap-5 min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-background transition-all ${
          isOpenModalInfo ? "w-56 border-l" : "w-0"
        }`}
      ></div>
    </div>
  );
};
