"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog-shared";
import { useSession } from "next-auth/react";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { RiParentFill } from "react-icons/ri";

import { updateUserAction } from "@/actions/user/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";

type UserProfile = {
  id: string;
  level: string | null;
  onboarded: boolean;
  role: string;
  userId: string;
};

export type OnboardingProps = {
  userProfile: UserProfile;
};

export const Onboarding = (props: OnboardingProps) => {
  const session = useSession();
  const [steps, setSteps] = React.useState(1);
  const [role, setRole] = React.useState("");
  const [level, setLevel] = React.useState("");
  const queryClient = useQueryClient();

  const { mutate: mutationuUpadateUser, isPending } = useMutation({
    mutationFn: async (data: { role: string; level: string }) => {
      const res = await updateUserAction(data);
      return res;
    },
    onSuccess: ({ data, serverError }) => {
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("Bienvenue sur la plateforme ProfaConnect ! 🎉");
      queryClient.invalidateQueries({
        queryKey: ["userProfile", session.data?.user?.id],
      });
    },
  });

  const dict_roles_user = {
    Étudiant: "STUDENT",
    Enseignant: "TEACHER",
    Parent: "PARENT",
  };

  const dict_levels = {
    Primaire: "PRIMARY",
    Collège: "MIDDLE_SCHOOL",
    Lycée: "HIGH_SCHOOL",
    "Post-Bac": "POST_SECONDARY",
    Licence: "BACHELOR",
    Master: "MASTER",
    Doctorat: "DOCTORATE",
  };

  return (
    <Dialog open={props.userProfile.onboarded === false}>
      <DialogContent>
        <div className="w-full h-80 flex flex-col justify-between">
          <DialogHeader>
            <DialogTitle className="flex justify-start">
              Bienvenue, faisons connaissance ! 👋
            </DialogTitle>
            <DialogDescription>
              Pour commencer, veuillez remplir les informations ci-dessous.
            </DialogDescription>
          </DialogHeader>
          {steps === 1 && (
            <div className="w-full space-y-2 h-full flex flex-col mt-3">
              <h4 className="font-medium text-sm">
                Quel est votre rôle dans l'éducation ?
              </h4>
              <div className="flex justify-between items-center gap-3 w-full grow">
                {["Étudiant", "Enseignant", "Parent"].map((value, index) => (
                  <div
                    key={index}
                    className={` flex items-center justify-center w-full border rounded-lg p-4 cursor-pointer hover:ring-2 ring-primary transition-all duration-200 h-full ${
                      role ===
                      dict_roles_user[value as keyof typeof dict_roles_user]
                        ? "ring-primary ring-2"
                        : ""
                    }`}
                    onClick={() => {
                      setRole(
                        dict_roles_user[value as keyof typeof dict_roles_user]
                      );
                    }}
                  >
                    <div className="flex items-center justify-center flex-col gap-2">
                      <div className="text-5xl">
                        {index === 0 && <PiStudentFill />}
                        {index === 1 && <GiTeacher />}
                        {index === 2 && <RiParentFill />}
                      </div>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {steps === 2 && (
            <div className="w-full space-y-2 h-full flex flex-col mt-3">
              <h4 className="font-medium text-sm">
                Dans quelle niveau êtes-vous ?
              </h4>
              <div className="grid grid-cols-4 gap-2 w-full grow">
                {[
                  "Primaire",
                  "Collège",
                  "Lycée",
                  "Post-B",
                  "Licence",
                  "Master",
                  "Doctorat",
                  "Autre",
                ].map((role, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center w-full border rounded-lg p-4 cursor-pointer hover:ring-2 ring-primary transition-all duration-200 ${
                      level === dict_levels[role as keyof typeof dict_levels]
                        ? "ring-primary ring-2"
                        : ""
                    }`}
                    onClick={() => {
                      setLevel(dict_levels[role as keyof typeof dict_levels]);
                    }}
                  >
                    <div className="flex items-center justify-center flex-col gap-2">
                      <p className="text-sm font-medium">{role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <div className="flex items-center gap-2 w-full justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">{steps}/2</p>
            </div>
            <div className="flex items-center gap-2">
              {steps > 1 && (
                <Button
                  onClick={() => {
                    setSteps(steps - 1);
                  }}
                  variant="outline"
                >
                  Précédent
                </Button>
              )}
              {steps < 2 && (
                <Button
                  onClick={() => {
                    if (steps === 1 && role === "") {
                      toast.error("Veuillez choisir un rôle");
                      return;
                    }
                    setSteps(steps + 1);
                  }}
                >
                  Suivant
                </Button>
              )}
              {steps === 2 && (
                <Button
                  disabled={isPending}
                  onClick={() => {
                    if (level === "") {
                      toast.error("Veuillez choisir un niveau");
                      return;
                    } else {
                      mutationuUpadateUser({
                        role: role,
                        level: level,
                      });
                    }
                  }}
                >
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Terminer
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
