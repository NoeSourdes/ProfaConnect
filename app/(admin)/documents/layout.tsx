import { ComponentInfo } from "@/src/components/dashboard/documents/ComponentInfo";
import { ComponentHeader } from "@/src/components/dashboard/documents/components/ComponentHeader";

import { ComponentTree } from "@/src/components/dashboard/documents/components/ComponentTree";

export default async function RouteLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <ComponentHeader />
      <div className="flex">
        <ComponentTree />

        {props.children}

        <ComponentInfo />
      </div>
    </div>
  );
}
