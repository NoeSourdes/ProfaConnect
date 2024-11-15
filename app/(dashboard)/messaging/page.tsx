import { cookies } from "next/headers";

import { Card, CardContent } from "@/src/components/ui/card";
import { ChatLayout } from "../../../src/components/dashboard/messaging/components/chat/chat-layout";

export default async function Home() {
  const cookieStore = await cookies();
  const layout = cookieStore.get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <div className="h-full w-full">
      <Card className="rounded-lg shadow-none border mt-5">
        <CardContent className="p-6 pb-7 relative">
          <div className="flex min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
            <div className="absolute inset-0">
              <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
