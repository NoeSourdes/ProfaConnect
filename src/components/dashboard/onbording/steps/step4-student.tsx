"use client";

import { getAllClassroomsAction } from "@/actions/classroom/classroom.actions";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/src/components/extension/multi-select";
import { Button } from "@/src/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ShieldQuestion } from "lucide-react";
import { useEffect, useState } from "react";

export type Step4StudentProps = {
  direction: number;
  variants: any;
  value: string[];
  newValue: string[][];
  setValue: (value: string[]) => void;
};

export const Step4Student = (props: Step4StudentProps) => {
  type optionsType = {
    value: string;
    label: string;
  }[];

  const [options, setOptions] = useState<optionsType>([]);

  const {
    data: classroom,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["classroom", "all"],
    queryFn: async () => {
      const classroom = await getAllClassroomsAction();
      return classroom;
    },
  });

  useEffect(() => {
    if (classroom) {
      setOptions(
        classroom.map((teacher) => ({
          label: teacher.title ?? "",
          value: teacher.idClassroom ?? "",
        }))
      );
    }
  }, [classroom]);

  return (
    <motion.div
      key="step-4"
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
      <div className="w-full flex items-center justify-between">
        <h4 className="font-medium text-sm">
          Souhaitez-vous ajouter des classes ? (Optionnel)
        </h4>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon_sm">
              <ShieldQuestion size={18} />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-80 p-2 py-0">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none"></h4>
                <p className="text-sm text-muted-foreground">
                  Si vous avez un professeur avec un compte ProfaConnect et
                  qu'il a créé une classe, vous devez entrer l'ID ou le nom de
                  la classe que le professeur vous a fourni.
                </p>
              </div>
              <div className="grid gap-2"></div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="w-full">
        <MultiSelector
          newValue={props.newValue}
          values={props.value}
          onValuesChange={props.setValue}
          loop={false}
        >
          <MultiSelectorTrigger>
            <MultiSelectorInput placeholder="Tapez l'ID ou le nom de la classe" />
          </MultiSelectorTrigger>
          <MultiSelectorContent>
            <MultiSelectorList className="max-h-44">
              {options.map((option, i) => (
                <MultiSelectorItem key={i} value={option.value}>
                  <div className="flex items-center gap-2">
                    <p>{option.label}</p>
                    <p className="hidden"> - {option.value}</p>
                  </div>
                </MultiSelectorItem>
              ))}
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
      </div>
    </motion.div>
  );
};
