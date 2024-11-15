"use client";

import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen bg-background flex items-center">
      <div className="container flex flex-col lg:flex-row items-center justify-between px-5 text-gray-700">
        <div className="w-full lg:w-1/2 mx-8">
          <div className="text-7xl text-primary font-dark font-extrabold mb-8">
            {" "}
            404
          </div>
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
            Désolé, nous n'avons pas pu trouver la page que vous recherchez
          </p>

          <Link href="/dashboard">
            <Button>Retour à la page d'accueil</Button>
          </Link>
        </div>
        <div className="w-96 lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <img src="/svg/404.svg" className="" alt="page not found" />
        </div>
      </div>
    </div>
  );
}
