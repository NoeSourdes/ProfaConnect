"use client";

import { Skeleton } from "../../ui/skeleton";

export default function IsLoadingComponent() {
  return (
    <div>
      <div className="h-full w-full overflow-y-scroll">
        <main className="flex flex-1 flex-col gap-4 lg:gap-5 h-full">
          <div className="w-full flex flex-wrap gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <Skeleton key={i} className="h-52 min-w-52 grow" />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
