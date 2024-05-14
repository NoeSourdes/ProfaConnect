import { Undo2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { BreadcrumbComponent } from "../Breadcrumb";
import TailwindAdvancedEditor from "../tiptap/Editor";

export type previewProps = {
  content: any;
  courseId: string;
  lessonId: string;
  lessonTitle: string;
};

export const PreviewLesson = (props: previewProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 w-full">
        <Link href={`/courses/${props.courseId}`}>
          <Button size="icon" variant="secondary">
            <Undo2 size={20} />
          </Button>
        </Link>
        <BreadcrumbComponent
          array={[
            { item: "Home", link: "/" },
            { item: "Dashboard", link: "/dashboard" },
            { item: "Cours", link: "/courses" },
            { item: "Leçons", link: `/courses/${props.courseId}` },
            {
              item: props.lessonTitle,
              link: `/courses/${props.courseId}/${props.lessonId}`,
            },
          ]}
        />
      </div>
      <Card className="rounded-lg border-none mt-6 shadow-none">
        <CardContent className="p-6 border-t">
          <div className="flex justify-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] rounded-lg">
            <TailwindAdvancedEditor
              editable={false}
              initialContent={props.content}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
