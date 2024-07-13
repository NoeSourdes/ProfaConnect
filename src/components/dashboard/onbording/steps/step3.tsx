import { motion } from "framer-motion";

export type step3Props = {
  direction: number;
  variants: any;
  level: string;
  setLevel: (value: string) => void;
  dict_levels: any;
};

export const Step3 = (props: step3Props) => {
  return (
    <motion.div
      key="step-3"
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
      <h4 className="font-medium text-sm">Dans quelle niveau êtes-vous ?</h4>
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
              props.level ===
              props.dict_levels[role as keyof typeof props.dict_levels]
                ? "ring-primary ring-2"
                : ""
            }`}
            onClick={() => {
              props.setLevel(
                props.dict_levels[role as keyof typeof props.dict_levels]
              );
            }}
          >
            <div className="flex items-center justify-center flex-col gap-2">
              <p className="text-sm font-medium">{role}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
