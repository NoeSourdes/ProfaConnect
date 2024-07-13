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
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Flag, Pen, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Checkbox } from "../../ui/checkbox";
import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Skeleton } from "../../ui/skeleton";
import {
  checkNameCategoryAction,
  createCategoryAction,
  deleteCategoryAction,
  getCategoriesAction,
  updateCategoryAction,
} from "./actions/category/category.action";
import {
  categorySchema,
  categoryType,
} from "./actions/category/category.schema";
import { ButtonCreateCategory } from "./components/buttonCreateCategory";

export type categoriesProps = {};

export const Categories = (props: categoriesProps) => {
  const form = useZodForm({
    schema: categorySchema,
  });

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const handleCheckNameCategory = async (name: string, userId: string) => {
    return await checkNameCategoryAction(name, userId);
  };

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

  const updateMutation = useMutation({
    mutationFn: async (values: { id: string; name: string }) => {
      const check = await handleCheckNameCategory(
        values.name,
        session?.user?.id as string
      );
      if (check) {
        toast.error("Le nom de la catégorie existe déjà");
        return;
      }
      const { data, serverError } = await updateCategoryAction({
        id: values.id,
        name: values.name,
      });
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("Catégorie modifiée avec succès");
      return data;
    },
    onSuccess: (data) => {
      if (data && session?.user) {
        queryClient.setQueryData(
          ["categories", session.user.id],
          (oldData: any[]) =>
            (oldData as any[]).map((category) =>
              category.id === data.id ? data : category
            )
        );
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, serverError } = await deleteCategoryAction(id);
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("Catégorie supprimée avec succès");
      return data;
    },
    onSuccess: (data) => {
      if (data && session?.user) {
        queryClient.setQueryData(
          ["categories", session.user.id],
          (oldData: any[]) =>
            (oldData as any[]).filter((category) => category.id !== data.id)
        );
      }
    },
  });

  const {
    data: categories,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["categories", session?.user?.id],
    queryFn: async () => {
      const categories = await getCategoriesAction(session?.user?.id as string);
      return categories;
    },
  });

  return (
    <div className="border rounded-lg">
      <div className="flex justify-between border-b py-2 px-2 scroll-px-24">
        <div className="flex items-center justify-between w-full">
          <h2 className="flex items-center gap-3 text-sm font-medium">
            <Flag size={18} />
            Catégories
          </h2>
          <ButtonCreateCategory />
        </div>
      </div>
      <div className="p-2 text-sm text-muted-foreground">
        {isLoading ? (
          <div className="flex flex-col gap-3 w-full">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 w-full"
                >
                  <div className="flex items-center gap-2 w-full">
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="w-1/2 h-4" />
                  </div>
                  <EllipsisVertical size={18} />
                </div>
              ))}
          </div>
        ) : isError ? (
          <div>Une erreur est survenue</div>
        ) : categories?.length === 0 ? (
          <div className=" p-3 text-center border rounded">
            <p className="text-sm text-muted-foreground font-medium p-2">
              Aucune catégorie n'a été créée
            </p>
            <ButtonCreateCategory buttonString2 />
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-3 w-full">
              {categories?.map((category, index) => (
                <div
                  key={category.id}
                  className={`flex items-center justify-between gap-3 w-full ${
                    index < categories.length - 1 ? "border-b pb-3" : ""
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" defaultChecked={true} />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </label>
                  </div>
                  <Popover>
                    <PopoverTrigger>
                      <EllipsisVertical size={18} />
                    </PopoverTrigger>
                    <PopoverContent className="max-w-56 p-2">
                      <div className="flex flex-col gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="w-full flex items-center justify-start gap-2"
                              variant="ghost"
                            >
                              <Pen size={18} />
                              Modifier la catégorie
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px] shadow-lg">
                            <DialogHeader>
                              <DialogTitle>Modifier la catégorie</DialogTitle>
                              <DialogDescription>
                                Modifiez le titre de la catégorie
                              </DialogDescription>
                            </DialogHeader>
                            <div>
                              <Form
                                form={form}
                                onSubmit={async (values) => {
                                  await updateMutation.mutateAsync({
                                    id: category.id,
                                    name: values.name,
                                  });
                                }}
                              >
                                <FormField
                                  control={form.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        Titre de la catégorie
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          defaultValue={category.name}
                                          placeholder="Entrez le titre de la catégorie"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormDescription>
                                        Le titre de la catégorie doit être
                                        unique
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
                                    {mutation.isPending
                                      ? "En cours..."
                                      : "Modifier"}
                                  </Button>
                                </DialogFooter>
                              </Form>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          className="w-full flex items-center justify-start gap-2 hover:text-destructive tramsition-colors"
                          variant="ghost"
                          onClick={() => {
                            deleteMutation.mutate(category.id);
                          }}
                        >
                          <Trash size={18} />
                          Supprimer la catégorie
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
