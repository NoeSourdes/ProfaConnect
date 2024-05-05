"use client";

import { ModeToggle } from "@/components/ToogleTheme";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-10">
      <h1 className="text-5xl font-bold text-primary/90">Profaconnect 2.0</h1>
      <ModeToggle />
      <Button
        onClick={() => {
          signIn("google", {
            callbackUrl: "/dashboard",
          });
        }}
      >
        Continuer avec Google
      </Button>
    </div>
  );
}
