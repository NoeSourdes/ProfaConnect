import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/src/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent bg-background hover:bg-secondary",
        link: "text-primary underline-offset-4 hover:underline",
        hover_sideBar:
          "hover:bg-primary/10 hover:text-primary text-muted-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        lg_sideBar: "h-11 p-[11.5px]",
        lg_sideBar_search: "h-11 pl-[10px] pr-[11.5px]",
        icon: "h-10 w-10",
        icon_sm: "h-8 w-8",
        icon_xs: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  tooltip?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Comp
              className={cn(buttonVariants({ variant, size, className }))}
              ref={ref}
              {...props}
            />
          </TooltipTrigger>
          {props.tooltip && (
            <TooltipContent>
              <p>{props.tooltip}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
