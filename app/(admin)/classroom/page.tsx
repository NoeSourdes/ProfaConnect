"use client";

import { getClassroomsByProfessorIdAction } from "@/actions/classroom/classroom.actions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

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

  console.log(classroom);
  return <div>Ma classe</div>;
}
