"use client";

import Tiptap from "@/components/dashboard/tiptap/Tiptap";
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

export type NewLessonComponentProps = {};

export const NewLessonComponent = (props: NewLessonComponentProps) => {
  return (
    <Tabs defaultValue="account" className="relative w-full h-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Créer une leçon</TabsTrigger>
        <TabsTrigger value="password">Importer un fichier</TabsTrigger>
      </TabsList>
      <TabsContent className="absolute inset-0 top-10" value="account">
        <Card className="h-full w-full flex flex-col">
          <CardHeader>
            <CardTitle>Créer une leçon</CardTitle>
            <CardDescription>
              Rédigez votre nouvelle leçon ci-dessous dans l'éditeur de texte.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 flex-1 w-full">
            <div className="w-full h-full border rounded-lg">
              <Tiptap />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Créer la leçon</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent className="absolute inset-0 top-10" value="password">
        <Card className="h-full w-full">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
