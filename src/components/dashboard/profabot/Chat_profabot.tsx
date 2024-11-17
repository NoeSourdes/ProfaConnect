"use client";

import { cn } from "@/src/lib/utils";
import { formatMessageContent } from "@/src/utils/formatMessageContent";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "../../ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatProps {
  messages: { role: "user" | "assistant"; content: string }[];
  setMessages: (value: Message[]) => void;
  loading: boolean;
}

export default function Chat_profabot({
  messages,
  setMessages,
  loading,
}: ChatProps) {
  const MotionDiv = motion.div as React.ComponentType<
    HTMLMotionProps<"div"> & { className?: string }
  >;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 right-0 bottom-0 flex flex-col gap-4 md:p-4 overflow-y-auto"
    >
      <div className="mb-16">
        <Button
          variant="outline"
          className="fixed top-[77px] right-9 border-none overflow-hidden"
          onClick={() => setMessages([])}
        >
          <div className="absolute inset-0 bg-[linear-gradient(120deg,#6EB6F2,#6EB6F2,#a855f7,#ea580c,#eab308)] p-0.5">
            <div className="size-full bg-background flex items-center justify-center rounded-[8px]">
              <p className="font-medium text-sm">Nouveau message</p>
            </div>
          </div>
          <p className="text-transparent">Nouveau message</p>
        </Button>

        <AnimatePresence>
          {messages.map((message, index) => (
            <MotionDiv
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{
                opacity: { duration: 0.2 },
                layout: { type: "spring", bounce: 0.4, duration: 0.4 },
              }}
              className={cn(
                "flex items-center w-full",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-3 w-full max-w-full",
                  message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg break-words whitespace-normal max-w-[90%]",
                    message.role === "assistant"
                      ? "w-full py-3"
                      : "bg-secondary max-w-xl p-3"
                  )}
                >
                  {message.role === "assistant" ? (
                    <div className="w-full flex items-start gap-5 break-words max-w-full">
                      <Image
                        src="/img/profabot.webp"
                        alt="logo star ai"
                        width={44}
                        height={44}
                        className="border rounded-full p-1 pr-1.5"
                      />
                      <div
                        className="formatted-content grow break-words max-w-full"
                        dangerouslySetInnerHTML={{
                          __html: formatMessageContent(message.content),
                        }}
                      />
                    </div>
                  ) : (
                    <div className="break-words max-w-full">
                      {message.content}
                    </div>
                  )}
                </div>
              </div>
            </MotionDiv>
          ))}

          {/* Indicateur de chargement */}
          {loading && (
            <MotionDiv
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center w-full justify-start"
            >
              <Image
                src="/img/profabot.webp"
                alt="logo star ai"
                width={44}
                height={44}
                className="border rounded-full p-1 pr-1.5"
              />
              <div className="flex items-center gap-3 w-full max-w-full flex-row">
                <div className="p-3 rounded-lg y max-w-xl">
                  <div className="flex items-center gap-2">
                    <div className="loader w-4 h-4 rounded-full border-2 border-t-transparent border-primary animate-spin"></div>
                    <p>ProfaBot réfléchit...</p>
                  </div>
                </div>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
