"use client";

import * as React from "react";

import { cn } from "@/src/lib/utils";
import { signIn } from "next-auth/react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Adresse e-mail
            </Label>
            <Input
              id="email"
              placeholder="nom@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <Button
            onClick={() => {
              signIn("resend", { callbackUrl: "/dashboard" });
            }}
          >
            Se connecter par e-mail
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continuer avec
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          signIn("google", { callbackUrl: "/dashboard" });
        }}
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}
