import Link from "next/link";

import { UserAuthForm } from "@/src/components/auth/user-auth-form";
import { buttonVariants } from "@/src/components/ui/button";
import Particles from "@/src/components/ui/particles";
import { cn } from "@/src/lib/utils";
import Image from "next/image";

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
      <div className="relative hidden h-full flex-col bg-secondary p-10 dark:border-r lg:flex items-center justify-center">
        <div className="absolute top-8 left-8 z-20 flex items-center gap-2">
          <Image
            src="/svg/logo.svg"
            alt="ProfaConnect"
            width={30}
            height={30}
          />
          <span className="font-bold text-lg">ProfaConnect</span>
        </div>
        <Image
          src="/svg/to-do-list.svg"
          alt="Authentification"
          height={700}
          width={700}
          className="z-[1000]"
        />
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color={`#5BBFC8`}
          refresh
        />
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
