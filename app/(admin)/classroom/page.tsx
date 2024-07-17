"use client";

import { getClassroomsByProfessorIdAction } from "@/actions/classroom/classroom.actions";
import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { Button } from "@/src/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Undo2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/components/ui/drawer";

export default function Page() {
  const { data: session } = useSession();

  const {
    data: classroom,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["classroom", "all"],
    queryFn: async () => {
      const classroom = await getClassroomsByProfessorIdAction(
        session?.user?.id ?? ""
      );
      return classroom;
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-5 w-full">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button size="icon" variant="outline">
              <Undo2 size={18} />
            </Button>
          </Link>
          <BreadcrumbComponent
            array={[{ item: "Mes classes", link: "/classroom" }]}
          />
        </div>
      </div>
      <div className="w-full h-full flex justify-between ">
        <section className="mt-2 w-full h-full">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Move Goal</DrawerTitle>
                  <DrawerDescription>
                    Set your daily activity goal.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0 max-h-[200px] h-full flex flex-col overflow-y-auto">
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                  <span>bonjout</span>
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </section>
      </div>
    </div>
  );
}
