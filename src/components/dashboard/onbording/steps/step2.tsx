import { motion } from "framer-motion";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { RiParentFill } from "react-icons/ri";

export type step2Props = {
  direction: number;
  variants: any;
  role: string;
  setRole: (value: string) => void;
  dict_roles_user: any;
};

export const Step2 = (props: step2Props) => {
  return (
    <motion.div
      key="step-2"
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
      <h4 className="font-medium text-sm">
        Quel est votre rôle dans l'éducation ?
      </h4>
      <div className="flex justify-between items-center gap-3 w-full grow">
        {["Étudiant", "Enseignant", "Parent"].map((value, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-full border rounded-lg p-4 cursor-pointer hover:ring-2 ring-primary transition-all duration-200 h-full ${
              props.role ===
              props.dict_roles_user[value as keyof typeof props.dict_roles_user]
                ? "ring-primary ring-2"
                : ""
            }`}
            onClick={() => {
              props.setRole(
                props.dict_roles_user[
                  value as keyof typeof props.dict_roles_user
                ]
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
    </motion.div>
  );
};
