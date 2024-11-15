"use client";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { ArrowUp } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

export default function page() {
  return (
    <div className="h-full w-full">
      <Card className="rounded-lg shadow-none border-0 mt-5">
        <CardContent className="p-6 pb-7 relative">
          <div className="flex min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
            <div className="absolute inset-0">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[25px] border border-input bg-background w-full max-w-3xl flex items-end p-4">
                <TextareaAutosize
                  maxRows={10}
                  placeholder="Écrire un message"
                  className="w-full h-full border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 resize-none no-scrollbar"
                />
                <div className="w-12 flex justify-end">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full absolute bottom-2 right-2"
                  >
                    <ArrowUp />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
