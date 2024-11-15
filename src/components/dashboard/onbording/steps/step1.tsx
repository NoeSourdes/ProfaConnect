"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { FaFemale, FaGenderless, FaMale } from "react-icons/fa";

export type step1Props = {
  direction: number;
  variants: any;
  gender: string;
  setGender: (value: string) => void;
  dict_gender_user: any;
};

const MotionDiv = motion.div as React.ComponentType<
  HTMLMotionProps<"div"> & { className?: string }
>;

export const Step1 = (props: step1Props) => {
  return (
    <MotionDiv
      key="step-1"
      exit="exit"
      custom={props.direction}
      variants={props.variants}
      initial="enter"
      animate="center"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      className="w-full space-y-2 h-full flex flex-col mt-3"
    >
      <h4 className="font-medium text-sm">Quel est votre sexe ?</h4>
      <div className="flex justify-between items-center gap-3 w-full grow">
        {["Femme", "Homme", "Non spécifié"].map((value, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-full border rounded-lg p-4 cursor-pointer hover:ring-2 ring-primary transition-all duration-200 h-full ${
              props.gender ===
              props.dict_gender_user[
                value as keyof typeof props.dict_gender_user
              ]
                ? "ring-primary ring-2"
                : ""
            }`}
            onClick={() => {
              props.setGender(
                props.dict_gender_user[
                  value as keyof typeof props.dict_gender_user
                ]
              );
            }}
          >
            <div className="flex items-center justify-center flex-col gap-2">
              <div className="text-5xl">
                {index === 0 && <FaFemale />}
                {index === 1 && <FaMale />}
                {index === 2 && <FaGenderless />}
              </div>
              <p className="text-sm font-medium">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </MotionDiv>
  );
};
