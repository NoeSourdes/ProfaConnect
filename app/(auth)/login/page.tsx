import { Metadata } from "next";
import Link from "next/link";

import { UserAuthForm } from "@/src/components/auth/user-auth-form";
import { buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Authentification",
  description:
    "Formulaires d'authentification construits en utilisant les composants.",
};

export default function Page() {
  return (
    <div className="h-screen container relative flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Retour
      </Link>
      <div className="relative hidden h-full flex-col bg-secondary p-10 dark:border-r lg:flex">
        <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
          <Image
            src="/img/logo.svg"
            alt="ProfaConnect"
            width={30}
            height={30}
          />
          ProfaConnect
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Créer un compte
            </h1>
            <p className="text-sm text-muted-foreground">
              Entrez votre adresse e-mail ci-dessous pour créer votre compte
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            En cliquant sur continuer, vous acceptez nos{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Conditions d'utilisation
            </Link>{" "}
            et notre{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
