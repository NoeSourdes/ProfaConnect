"use client";

import Base_profabot from "@/src/components/dashboard/profabot/base_profabot";
import Chat_profabot from "@/src/components/dashboard/profabot/Chat_profabot";
import Input_profabot from "@/src/components/dashboard/profabot/Input_profabot";
import { Card, CardContent } from "@/src/components/ui/card";
import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}
export default function Page() {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="h-full w-full">
      <Card className="rounded-lg shadow-none border-0 mt-5">
        <CardContent className="p-6 pb-7 relative">
          <div className="flex min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
            {messages.length === 0 ? (
              <Base_profabot setInputValue={setInputValue} />
            ) : (
              <Chat_profabot
                messages={messages}
                setMessages={setMessages}
                loading={loading}
              />
            )}
            <Input_profabot
              inputValue={inputValue}
              setInputValue={setInputValue}
              setMessages={setMessages}
              messages={messages}
              setLoading={setLoading}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
