"use client";

import { useSession } from "next-auth/react";

import {
  getClassroomTitleByIdAction,
  updateClassroomAddStudent,
} from "@/actions/admin/classroom/classroom.actions";
import { updateUserAction } from "@/actions/user/user";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/src/components/expenssion/modal-responsive-2xl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Step1 } from "./steps/step1";
import { Step2 } from "./steps/step2";
import { Step3 } from "./steps/step3";
import { Step4Student } from "./steps/step4-student";
import { Step4Teacher } from "./steps/step4-teacher";

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
  const [direction, setDirection] = React.useState(0);
  const [role, setRole] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [gender, setGender] = React.useState("");

  const queryClient = useQueryClient();

  const { mutate: mutationuUpadateUser, isPending } = useMutation({
    mutationFn: async (data: {
      role: string;
      level: string;
      gender: string;
    }) => {
      const result = await updateUserAction(data);

      if (!result) {
        throw new Error("Result is undefined");
      }

      if (result.serverError || !result.data) {
        throw new Error(result.serverError || "Failed to update user profile");
      }

      return result.data;
    },
    onSuccess: (data) => {
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

  const dict_gender_user = {
    Femme: "GIRL",
    Homme: "BOY",
    "Non spécifié": "UNSPECIFIED",
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

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 100 : -100,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 100 : -100,
        opacity: 0,
      };
    },
  };

  const handleNextStep = () => {
    setDirection(1);
    setSteps(steps + 1);
  };

  const handlePrevStep = () => {
    setDirection(-1);
    setSteps(steps - 1);
  };

  const functionNewValue = async (classroomId: string) => {
    const result = await getClassroomTitleByIdAction(classroomId);

    if (!result) {
      throw new Error("Result is undefined");
    }

    if (result.serverError || !result.data) {
      throw new Error(result.serverError || "Failed to fetch classroom title");
    }

    setNewValue((prev) => [...prev, [result.data ?? "", classroomId]]);
  };
  const [value, setValue] = useState<string[]>([]);
  const [newValue, setNewValue] = useState<string[][]>([]);

  useEffect(() => {
    setNewValue([]);
    value.forEach((classroomId) => {
      functionNewValue(classroomId);
    });
  }, [value]);

  const updateClassroom = async () => {
    if (value.length === 0) {
      return;
    }
    value.forEach((classroomId) => {
      updateClassroomAddStudent({
        idClassroom: classroomId,
        idStudent: props.userProfile.userId,
      });
    });
  };

  return (
    <ResponsiveModal open={props.userProfile.onboarded === false}>
      <ResponsiveModalContent className="overflow-hidden">
        <div className="w-full h-[340px] flex flex-col justify-between">
          <ResponsiveModalHeader>
            <ResponsiveModalTitle className="flex justify-start">
              Bienvenue, faisons connaissance ! 👋
            </ResponsiveModalTitle>
            <ResponsiveModalDescription>
              Pour commencer, veuillez remplir les informations ci-dessous.
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            {steps === 1 && (
              <Step1
                direction={direction}
                variants={variants}
                gender={gender}
                setGender={setGender}
                dict_gender_user={dict_gender_user}
              />
            )}
            {steps === 2 && (
              <Step2
                direction={direction}
                variants={variants}
                role={role}
                setRole={setRole}
                dict_roles_user={dict_roles_user}
              />
            )}
            {steps === 3 && (
              <Step3
                direction={direction}
                variants={variants}
                level={level}
                setLevel={setLevel}
                dict_levels={dict_levels}
              />
            )}
            {steps === 4 &&
              (role === "STUDENT" || role === "PARENT" ? (
                <Step4Student
                  direction={direction}
                  variants={variants}
                  value={value}
                  newValue={newValue}
                  setValue={setValue}
                />
              ) : (
                <Step4Teacher direction={direction} variants={variants} />
              ))}
          </AnimatePresence>
        </div>
        <ResponsiveModalFooter>
          <div className="flex items-center gap-2 w-full justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">{steps}/4</p>
            </div>
            <div className="flex items-center gap-2">
              {steps > 1 && (
                <Button onClick={handlePrevStep} variant="outline">
                  Précédent
                </Button>
              )}
              {steps < 4 && (
                <Button
                  onClick={() => {
                    if (steps === 1 && gender === "") {
                      toast.error("Veuillez choisir un sexe");
                      return;
                    }
                    if (steps === 2 && role === "") {
                      toast.error("Veuillez choisir un rôle");
                      return;
                    }
                    if (steps === 3 && level === "") {
                      toast.error("Veuillez choisir un niveau");
                      return;
                    }
                    handleNextStep();
                  }}
                >
                  Suivant
                </Button>
              )}
              {steps === 4 && (
                <Button
                  disabled={isPending}
                  onClick={() => {
                    if (steps === 4 && role === "STUDENT") {
                      updateClassroom();
                    }

                    mutationuUpadateUser({
                      role: role,
                      level: level,
                      gender: gender,
                    });
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
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
