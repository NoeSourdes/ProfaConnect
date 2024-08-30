"use client";

import { useViewSelect } from "@/actions/admin/courses/viewSelect.store";
import IsErrorComponent from "@/src/components/dashboard/courses/isError-component";
import IsLoadingComponent from "@/src/components/dashboard/courses/isLoading-component";
import IsSuccessComponent from "@/src/components/dashboard/courses/isSuccess-component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  deleteCourseAction,
  getUserCourses,
} from "../../../actions/admin/courses/course.actions";

export default function Course() {
  const { data: user } = useSession();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  const { view } = useViewSelect();

  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses", user?.user?.id ? user.user.id : ""],
    queryFn: async () => {
      const courses = await getUserCourses(user?.user?.id ? user.user.id : "");
      return courses.map((course) => ({
        ...course,
        published: course.published ?? false,
      }));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (idCourse: { id: string }) => deleteCourseAction(idCourse.id),
    onSuccess: ({ data, serverError }) => {
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("Le cours a été supprimé avec succès");

      queryClient.invalidateQueries({
        queryKey: ["courses", user?.user?.id ? user.user.id : ""],
      });
    },
  });

  if (isLoading) {
    return <IsLoadingComponent />;
  }

  if (isError) {
    return <IsErrorComponent />;
  }

  return (
    <IsSuccessComponent
      courses={courses}
      user={user}
      deleteMutation={deleteMutation}
      view={view}
      search={search}
      setSearch={setSearch}
    />
  );
}
