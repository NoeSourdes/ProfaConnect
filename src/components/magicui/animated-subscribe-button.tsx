"use client";

import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import React, { useState } from "react";

// Alias pour typer correctement motion.button et motion.span avec className
const MotionButton = motion.button as React.ComponentType<
  HTMLMotionProps<"button"> &
    React.HTMLAttributes<HTMLDivElement> & { className?: string }
>;
const MotionSpan = motion.span as React.ComponentType<
  HTMLMotionProps<"span"> & { className?: string }
>;

interface AnimatedSubscribeButtonProps {
  buttonColor: string;
  buttonTextColor?: string;
  subscribeStatus: boolean;
  initialText: React.ReactElement | string;
  changeText: React.ReactElement | string;
  userId: string;
}

export const AnimatedSubscribeButton: React.FC<
  AnimatedSubscribeButtonProps
> = ({
  buttonColor,
  subscribeStatus,
  buttonTextColor,
  changeText,
  initialText,
  userId,
}) => {
  const [isIdCopy, setIsIdCopy] = useState<boolean>(subscribeStatus);

  return (
    <AnimatePresence mode="wait">
      {isIdCopy ? (
        <MotionButton
          className="relative flex items-center w-full justify-center overflow-hidden rounded-md bg-secondary p-[10px] outline-border"
          onClick={() => {
            navigator.clipboard.writeText(userId);
            setIsIdCopy(false);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MotionSpan
            key="action"
            className="relative block h-full w-full font-semibold"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            style={{ color: buttonColor }}
          >
            {changeText}
          </MotionSpan>
        </MotionButton>
      ) : (
        <MotionButton
          className="relative flex w-full cursor-pointer items-center justify-center rounded-md border-none p-[10px]"
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
          onClick={() => {
            navigator.clipboard.writeText(userId);
            setIsIdCopy(true);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MotionSpan
            key="reaction"
            className="relative block font-semibold"
            initial={{ x: 0 }}
            exit={{ x: 50, transition: { duration: 0.1 } }}
          >
            {initialText}
          </MotionSpan>
        </MotionButton>
      )}
    </AnimatePresence>
  );
};
