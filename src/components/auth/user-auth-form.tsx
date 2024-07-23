import * as React from "react";

import { signIn } from "@/src/lib/auth/auth";
import { cn } from "@/src/lib/utils";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form
        action={async (formData) => {
          "use server";
          await signIn("resend", formData);
        }}
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Adresse e-mail
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="nom@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <Button type="submit">Se connecter par e-mail</Button>
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
      <Button variant="outline" type="button">
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}
