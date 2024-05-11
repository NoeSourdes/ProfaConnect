"use client";

import FileUploaderComponent from "@/components/dashboard/file-uploader/fileUpload";
import TailwindEditor from "@/components/dashboard/tiptap/Editor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Paperclip } from "lucide-react";
import { useState } from "react";

export type NewLessonComponentProps = {};

export const NewLessonComponent = (props: NewLessonComponentProps) => {
  const [title, setTitle] = useState("");
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
              <TailwindEditor />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Créer la leçon</Button>
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
