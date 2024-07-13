"use client";

import { getClassroomsByProfessorIdAction } from "@/actions/classroom/classroom.actions";
import { Button } from "@/src/components/ui/button";
import {
  Step,
  Stepper,
  useStepper,
  type StepItem,
} from "@/src/components/ui/stepper";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const steps = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Step 3" },
] satisfies StepItem[];

export default function Page() {
  const { data: session } = useSession();

  const {
    data: classroom,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["classroom", "all"],
    queryFn: async () => {
      const classroom = await getClassroomsByProfessorIdAction(
        session?.user?.id ?? ""
      );
      return classroom;
    },
  });

  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          return <Step key={stepProps.label} {...stepProps}></Step>;
        })}
        <Footer />
      </Stepper>
    </div>
  );
}

const Footer = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
    isDisabledStep,
  } = useStepper();
  return (
    <>
      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
