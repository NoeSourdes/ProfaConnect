"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/src/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { cn } from "@/src/lib/utils";

const DocumentType = [
  { value: "all", label: "Tous" },
  { value: "documents", label: "Documents" },
  { value: "files", label: "Fichiers" },
];

const dateFilter = [
  { value: "today", label: "Aujourd'hui" },
  { value: "7LastDays", label: "7 derniers jours" },
  { value: "30LastDays", label: "30 derniers jours" },
  { value: "LastMonth", label: "Mois dernier" },
  { value: "LastYear", label: "Année dernier" },
];

export type FiltersSectionProps = {
  valueType: string;
  valueDate: string;
  setValueType: (value: string) => void;
  setValueDate: (value: string) => void;
};

export const FiltersSection = ({
  valueType,
  valueDate,
  setValueType,
  setValueDate,
}: FiltersSectionProps) => {
  const [openType, setOpenType] = React.useState(false);
  const [openDate, setOpenDate] = React.useState(false);
  return (
    <div className="h-10 flex rounded-lg w-full items-center gap-3">
      <Popover open={openType} onOpenChange={setOpenType}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openType}
            className="w-[200px] justify-between"
          >
            {valueType
              ? DocumentType.find((type) => type.value === valueType)?.label
              : "Tous les types"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Rechercher un type..." />
            <CommandList>
              <CommandEmpty>Aucun type trouvé.</CommandEmpty>
              <CommandGroup>
                {DocumentType.map((type) => (
                  <CommandItem
                    key={type.value}
                    value={type.value}
                    onSelect={(currentValue) => {
                      setValueType(
                        currentValue === valueType ? "" : currentValue
                      );
                      setOpenType(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        valueType === type.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {type.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Popover open={openDate} onOpenChange={setOpenDate}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openDate}
            className=" justify-between"
          >
            {valueDate
              ? dateFilter.find((filter) => filter.value === valueDate)?.label
              : "Sélectionner une période..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" p-0">
          <Command>
            <CommandInput placeholder="Rechercher une période..." />
            <CommandList>
              <CommandEmpty>Aucune période trouvée.</CommandEmpty>
              <CommandGroup>
                {dateFilter.map((filter) => (
                  <CommandItem
                    key={filter.value}
                    value={filter.value}
                    onSelect={(currentValue) => {
                      setValueDate(
                        currentValue === valueDate ? "" : currentValue
                      );
                      setOpenDate(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        valueDate === filter.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {filter.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
