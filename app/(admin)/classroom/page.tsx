"use client";

import { getClassroomsByProfessorIdAction } from "@/actions/admin/classroom/classroom.actions";
import { BreadcrumbComponent } from "@/src/components/dashboard/Breadcrumb";
import { Button } from "@/src/components/ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/src/components/ui/credenza";
import { useQuery } from "@tanstack/react-query";
import { Undo2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
          <Credenza>
            <CredenzaTrigger asChild>
              <Button>Open modal</Button>
            </CredenzaTrigger>
            <CredenzaContent className="p-6">
              <CredenzaHeader>
                <CredenzaTitle>Credenza</CredenzaTitle>
                <CredenzaDescription>
                  A responsive modal component for shadcn/ui.
                </CredenzaDescription>
              </CredenzaHeader>
              <CredenzaBody>
                This component is built using shadcn/ui&apos;s dialog and drawer
                component, which is built on top of Vaul.
              </CredenzaBody>
              <CredenzaFooter>
                <CredenzaClose asChild>
                  <button>Close</button>
                </CredenzaClose>
              </CredenzaFooter>
            </CredenzaContent>
          </Credenza>
        </section>
      </div>
    </div>
  );
}
