"use client";

import { getUserProfileAction } from "@/actions/user/user";
import { AnimatedSubscribeButton } from "@/src/components/magicui/animated-subscribe-button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog-shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { getRoleFrench } from "@/src/hooks/user-actions";
import { useQuery } from "@tanstack/react-query";
import { toPng } from "html-to-image";
import {
  CheckIcon,
  ChevronRightIcon,
  Download,
  LayoutGrid,
  Link2,
  LogOut,
  Mail,
  QrCode,
  Settings,
  Shapes,
  SquareArrowUpRight,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";
import { GlareCardComp } from "../GlareCard";

export function UserNav() {
  const { data: user } = useSession();

  const {
    data: userProfile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", user?.user?.id ?? ""],
    queryFn: async () => {
      const userProfile = await getUserProfileAction(user?.user?.id ?? "");
      return userProfile;
    },
  });

  const downloadGlareCard = () => {
    const glareCardElement = document.getElementById("glareCard");
    if (glareCardElement) {
      toPng(glareCardElement)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "glarecard.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          toast.error("Erreur lors du téléchargement de la carte !");
        });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={
                user?.user?.image
                  ? user?.user?.image
                  : "https://ui-avatars.com/api/?name=" + user?.user?.name
              }
              alt="Avatar"
            />
            <AvatarFallback className="bg-transparent">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.user?.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              {getRoleFrench(userProfile?.data?.role ?? "")}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/dashboard" className="flex items-center">
              <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
              Tableau de bord
            </Link>
          </DropdownMenuItem>
          <div className="flex items-center justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <div className="hover:cursor-pointer w-[127px] relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-secondary">
                  <SquareArrowUpRight className="w-4 h-4 mr-3 text-muted-foreground" />{" "}
                  Partager
                </div>
              </DialogTrigger>
              <DialogContent className="max-h-[600px] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    Partager le tableau de bord avec vos élèves
                  </DialogTitle>
                  <DialogDescription>
                    Partagez cette carte avec vos élèves pour qu'ils puissent
                    accéder à votre contenu mis en ligne sur le tableau de bord.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-start max-sm:flex-col max-sm:items-center gap-6">
                  <div id="glareCard">
                    <GlareCardComp />
                  </div>
                  <div className="flex flex-col w-full justify-between h-full gap-5">
                    <div className="flex flex-col w-full gap-3">
                      <Button
                        variant="outline"
                        className="flex items-center justify-start"
                      >
                        <Mail className="w-4 h-4 mr-3 text-muted-foreground" />
                        Partager via e-mail
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center justify-start"
                      >
                        <Link2 className="w-4 h-4 mr-3 text-muted-foreground" />
                        Partager via un lien
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center justify-start"
                      >
                        <QrCode className="w-4 h-4 mr-3 text-muted-foreground" />
                        Partager via un QR Code
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Veuillez copier votre ID personnel pour partager votre
                        tableau de bord.
                      </p>
                      <div className="">
                        <AnimatedSubscribeButton
                          userId={userProfile?.data?.myIdShare ?? ""}
                          buttonColor="#2463EB"
                          buttonTextColor="#ffffff"
                          subscribeStatus={false}
                          initialText={
                            <span className="group inline-flex items-center">
                              Copier mon ID personnel{" "}
                              <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                          }
                          changeText={
                            <span className="group inline-flex items-center">
                              <CheckIcon className="mr-2 h-4 w-4" />
                              ID copié
                            </span>
                          }
                        />{" "}
                      </div>
                    </div>
                    <div className="w-full">
                      <Button
                        variant="outline"
                        className="flex items-center justify-start w-full"
                        onClick={downloadGlareCard}
                      >
                        <Download className="w-4 h-4 mr-3 text-muted-foreground" />
                        Télécharger ma carte
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <kbd
                onClick={() => {
                  navigator.clipboard.writeText(
                    userProfile?.data?.myIdShare ?? ""
                  );
                  toast.success("ID copié dans le presse-papiers");
                }}
                className="inline-flex h-full select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100"
              >
                copier ID
              </kbd>
            </DropdownMenuItem>
          </div>
          {userProfile?.data?.role === "TEACHER" && (
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link href="/settings" className="flex items-center">
                <Shapes className="w-4 h-4 mr-3 text-muted-foreground" />
                Ma classe
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/settings" className="flex items-center">
              <Settings className="w-4 h-4 mr-3 text-muted-foreground" />
              Paramètres
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
