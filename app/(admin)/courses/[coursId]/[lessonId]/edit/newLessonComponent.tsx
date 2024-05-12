"use client";

import FileUploaderComponent from "@/src/components/dashboard/file-uploader/fileUpload";
import TailwindEditor from "@/src/components/dashboard/tiptap/Editor";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { useMutation } from "@tanstack/react-query";
import { Paperclip } from "lucide-react";
import { useRouter } from "next/navigation";
import { JSONContent } from "novel";
import { useState } from "react";
import { toast } from "sonner";
import { checkTitleLessonAction, createLesson } from "./lesson.action";
import { lessonType } from "./lesson.schema";

export type NewLessonComponentProps = {
  courseId: string;
};

export const NewLessonComponent = (props: NewLessonComponentProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent | null>(null);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: lessonType) => {
      const checkTitle = await checkTitleLessonAction(values.title);
      if (checkTitle) {
        toast.error("Le titre de la leçon est déjà utilisé");
        return;
      }
      if (!content || !title) {
        toast.error("Veuillez rédiger le contenu de la leçon");
        return;
      }
      const { data, serverError } = await createLesson(values);
      if (serverError || !data) {
        throw new Error(serverError);
      }
      toast.success("La leçon a été créée avec succès");
      localStorage.setItem(
        "novel-content",
        JSON.stringify({
          type: "doc",
          content: [""],
        })
      );
      router.push(`/courses/${data.courseId}`);
    },
  });

  return (
    <Tabs defaultValue="create" className="relative w-full h-full ">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="create">Créer une leçon</TabsTrigger>
        <TabsTrigger value="import">Importer un fichier</TabsTrigger>
      </TabsList>
      <TabsContent value="create">
        <Card className="h-full w-full flex flex-col p-0">
          <CardHeader>
            <div className="flex sm:items-center justify-between gap-3 max-sm:flex-col">
              <div>
                <CardTitle>Créer une leçon</CardTitle>
                <CardDescription>
                  Rédigez votre nouvelle leçon ci-dessous dans l'éditeur de
                  texte.
                </CardDescription>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="title">Titre de la leçon</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Tapez le titre de la leçon"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 w-full overflow-hidden border-t max-lg:p-0">
            <div className="w-full overflow-y-scroll pt-3">
              <TailwindEditor setContent={setContent} />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() =>
                mutation.mutateAsync({
                  title,
                  courseId: props.courseId,
                  content: JSON.stringify({
                    type: "doc",
                    content: content,
                  }),
                })
              }
            >
              Créer la leçon
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent className="h-full w-full" value="import">
        <Card className="h-full w-full flex flex-col p-0">
          <CardHeader>
            <div className="flex sm:items-center justify-between gap-3 max-sm:flex-col">
              <div>
                <CardTitle>Importer un fichier</CardTitle>
                <CardDescription>
                  Importez un fichier pour créer une leçon.
                </CardDescription>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="title">Titre de la leçon</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Tapez le titre de la leçon"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="border-t pt-5 ">
            <FileUploaderComponent />
          </CardContent>
          <CardFooter>
            <Button>
              <Paperclip size={16} className="mr-2" />
              Importer le fichier
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
function createLessonAction(values: {
  title: string;
  courseId: string;
  content?: any;
}):
  | { data: any; serverError: any }
  | PromiseLike<{ data: any; serverError: any }> {
  throw new Error("Function not implemented.");
}
