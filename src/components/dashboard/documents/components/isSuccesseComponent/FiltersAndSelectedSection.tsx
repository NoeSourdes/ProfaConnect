import { fileTypeGlobal } from "@/actions/admin/files/file.schema";
import { Button } from "@/src/components/ui/button";
import { HTMLMotionProps, motion } from "framer-motion";
import { EllipsisVertical, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FiltersSection } from "../FiltersSection";

interface FiltersAndSelectedSectionProps {
  selectedDocuments: fileTypeGlobal[];
  setSelectedDocuments: any;
  valueType: string;
  valueDate: string;
  variants: any;
  folders: any;
  setValueType: Dispatch<SetStateAction<string>>;
  setValueDate: Dispatch<SetStateAction<string>>;
}

const MotionDiv = motion.div as React.ComponentType<
  HTMLMotionProps<"div"> & { className?: string }
>;

export const FiltersAndSelectedSection = (
  props: FiltersAndSelectedSectionProps
) => {
  return (
    <div className="flex items-center justify-between gap-3 relative">
      <MotionDiv
        variants={props.variants}
        animate={props.selectedDocuments.length > 0 ? "closed" : "open"}
        className="h-10 flex rounded-lg w-full items-center gap-3"
      >
        <FiltersSection
          valueType={props.valueType}
          valueDate={props.valueDate}
          setValueType={props.setValueType}
          setValueDate={props.setValueDate}
        />
      </MotionDiv>

      <MotionDiv
        variants={props.variants}
        animate={props.selectedDocuments.length > 0 ? "open" : "closed"}
        className="absolute w-full bg-secondary rounded-lg h-10 px-1 gap-3"
      >
        <Button
          variant="ghost"
          size="icon_sm"
          className={` ${
            props.selectedDocuments.length > 0 ? "opacity-1" : "opacity-0"
          } bg-secondary hover:bg-border`}
        >
          <X
            size={18}
            className={`text-muted-foreground cursor-pointer`}
            onClick={() => {
              props.setSelectedDocuments([]);
            }}
          />
        </Button>
        <span
          className={`text-muted-foreground text-sm ${
            props.selectedDocuments.length > 0 ? "opacity-1" : "opacity-0"
          }`}
        >
          <span className="text-primary font-medium">
            {props.selectedDocuments.length}
          </span>{" "}
          {""}
          élément{props.selectedDocuments.length > 1 ? "s" : ""} sélectionné
          {props.selectedDocuments.length > 1 ? "s" : ""} sur{" "}
          {props.folders?.length}
        </span>
        <Button
          variant="ghost"
          size="icon_sm"
          className={` ${
            props.selectedDocuments.length > 0 ? "opacity-1" : "opacity-0"
          } bg-secondary hover:bg-border`}
        >
          <EllipsisVertical size={18} className={`cursor-pointer`} />
        </Button>
      </MotionDiv>
    </div>
  );
};
