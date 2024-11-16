"use client";

import { ArrowUp } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../../ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Input_profabotProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  setMessages: (value: Message[] | ((prev: Message[]) => Message[])) => void;
  messages: Message[];
  setLoading: (value: boolean) => void;
}

export default function Input_profabot({
  setInputValue,
  setMessages,
  inputValue,
  messages,
  setLoading,
}: Input_profabotProps) {
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/profabot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role === "assistant" ? "assistant" : msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from ProfaBot API");
      }

      const data = await response.json();

      const botMessage: Message = {
        role: "assistant",
        content: data.text || "Désolé, je n'ai pas pu répondre.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Erreur lors de la génération de la réponse.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20">
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[25px] border border-input bg-background w-full max-w-3xl flex items-end p-4">
        {/* <TextareaAutosize
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          maxRows={10}
          placeholder="Écrire un message"
          className="w-full h-full border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 resize-none no-scrollbar"
        /> */}
        <div className="w-12 flex justify-end">
          <Button
            size="icon"
            variant="secondary"
            onClick={handleSendMessage}
            className="rounded-full absolute bottom-2 right-2"
          >
            <ArrowUp />
          </Button>
        </div>
      </div>
    </div>
  );
}
