"use client";

import { Label } from "@/src/components/ui/label";
import { Clock } from "lucide-react";
import * as React from "react";
import { TimePickerInput } from "./time-picker-input";

interface TimePickerComponentProps {
  date: Date | undefined;
  setDate: (date: Date) => void;
  onTimeChange?: (time: string) => void;
}

export function TimePickerComponent({
  date,
  setDate,
  onTimeChange,
}: TimePickerComponentProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  const updateDate = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      if (onTimeChange) {
        const formattedTime = newDate.toLocaleTimeString("fr-FR", {
          hour12: false,
        });
        onTimeChange(formattedTime);
      }
    }
  };

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
        <TimePickerInput
          picker="hours"
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
          date={date}
          setDate={(newDate) => updateDate(newDate)}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <TimePickerInput
          picker="minutes"
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
          date={date}
          setDate={(newDate) => updateDate(newDate)}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="seconds" className="text-xs">
          Seconds
        </Label>
        <TimePickerInput
          picker="seconds"
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
          date={date}
          setDate={(newDate) => updateDate(newDate)}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
}
