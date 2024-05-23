"use client";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  checkNameCategoryAction,
  createCategoryAction,
} from "../actions/category/category.action";
import {
  categorySchema,
  categoryType,
} from "../actions/category/category.schema";

export type ButtonCreateCategoryProps = {
  buttonString?: boolean;
};

export const ButtonCreateCategory = (props: ButtonCreateCategoryProps) => {
  const { data: session } = useSession();

  const handleCheckNameCategory = async (name: string, userId: string) => {
    return await checkNameCategoryAction(name, userId);
  };

  const form = useZodForm({
    schema: categorySchema,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: categoryType) => {
      const check = await handleCheckNameCategory(
        values.name,
        session?.user?.id as string
      );
      if (check) {
        toast.error("Le nom de la catégorie existe déjà");
        return;
      }
      const { data, serverError } = await createCategoryAction(values);
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("Catégorie ajoutée avec succès");
      return data;
    },
    onSuccess: (data) => {
      if (data && session?.user) {
        queryClient.setQueryData(
          ["categories", session.user.id],
          (oldData: any[]) => [...(oldData as any[]), data]
        );
      }
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={props.buttonString ? "sm" : "icon_sm"}
          className={props.buttonString ? "w-full" : ""}
        >
          {props.buttonString ? "Ajouter une catégorie" : <Plus size={20} />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une catégorie</DialogTitle>
          <DialogDescription>
            Ajoutez une catégorie pour organiser votre temps
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form
            form={form}
            onSubmit={async (values) => {
              await mutation.mutateAsync(values);
            }}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre de la catégorie</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="
                  Entrez le titre de la catégorie"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Le titre de la catégorie doit être unique
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Annuler</Button>
              </DialogClose>
              <Button type="submit">
                {mutation.isPending ? "En cours..." : "Ajouter"}
              </Button>
            </DialogFooter>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
