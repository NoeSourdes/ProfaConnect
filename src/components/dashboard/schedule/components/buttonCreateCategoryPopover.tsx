"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

import { Plus } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { useState } from "react";
import { toast } from "sonner";

export type buttonCreateCategoryPopoverProps = {
  categories: any;
  formCategory: any;
  mutationCategory: any;
};

export const ButtonCreateCategoryPopover = (
  props: buttonCreateCategoryPopoverProps
) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (categoryName === "") {
      toast.error("Le nom de la catégorie est requis");
      return;
    }
    await props.mutationCategory.mutateAsync({ name: categoryName });
    setCategoryName("");
  };
  return (
    <>
      {props.categories?.length === 0
        ? "Aucune catégorie"
        : "Créer une catégorie"}{" "}
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon_sm" variant="secondary">
            <Plus />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <form className="flex flex-col">
            <h1 className="text-lg font-medium">Ajouter une catégorie</h1>
            <div className="space-y-1">
              <label className="text-sm font-medium" htmlFor="categoryName">
                Titre de la catégorie
              </label>
              <Input
                id="categoryName"
                placeholder="Entrez le titre de la catégorie"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={props.mutationCategory.isPending}
              className="w-full mt-3"
            >
              {props.mutationCategory.isPending ? "En cours..." : "Ajouter"}
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
};
