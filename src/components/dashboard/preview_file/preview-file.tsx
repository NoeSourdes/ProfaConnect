import { Undo2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { BreadcrumbComponent } from "../Breadcrumb";

export type previewProps = {
  content: any;
  folderId: string;
  fileId: string;
  lessonTitle: string;
};

export const PreviewLesson = (props: previewProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 w-full">
        <Link href={`/documents/${props.folderId}`}>
          <Button size="icon" variant="outline">
            <Undo2 size={18} />
          </Button>
        </Link>
        <BreadcrumbComponent
          array={[
            { item: "Mes documents", link: "/documents" },
            { item: "fichiers", link: `/documents/${props.folderId}` },
            {
              item: props.lessonTitle,
              link: `/documents/${props.folderId}/${props.fileId}`,
            },
          ]}
        />
      </div>
      <Card className="rounded-lg border-none mt-6 shadow-none">
        <CardContent className="p-6 pb-7 border-t max-sm:px-0">
          <div className="flex justify-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] rounded-lg"></div>
        </CardContent>
      </Card>
    </div>
  );
};
