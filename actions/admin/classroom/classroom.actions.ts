"use server";

import { prisma } from "@/src/lib/prisma";
import { authAction } from "@/src/lib/safe-actions";
import { z } from "zod";
import { createClassroomSchema } from "./classroom.schema";

// Création d'une classe
export const createClassroomAction = authAction
  .schema(createClassroomSchema)
  .action(async ({ parsedInput: inputs, ctx }) => {
    if (!ctx.user.id) {
      throw new Error("Professor ID is required");
    }
    const classroom = await prisma.classroom.create({
      data: {
        ...inputs,
        professorId: ctx.user.id,
      },
    });
    return classroom;
  });

// Suppression d'une classe
export const deleteClassroomAction = authAction
  .schema(z.string())
  .action(async ({ parsedInput: classroomId }) => {
    const classroom = await prisma.classroom.delete({
      where: {
        idClassroom: classroomId,
      },
    });
    return classroom;
  });

// Ajouter un étudiant à une classe
export const updateClassroomAddStudent = authAction
  .schema(
    z.object({
      idClassroom: z.string(),
      idStudent: z.string(),
    })
  )
  .action(async ({ parsedInput: { idClassroom, idStudent } }) => {
    const classroom = await prisma.classroom.update({
      where: {
        idClassroom,
      },
      data: {
        students: {
          connect: {
            id: idStudent,
          },
        },
      },
    });
    return classroom;
  });

// Supprimer un étudiant d'une classe
export const updateClassroomDeleteStudent = authAction
  .schema(
    z.object({
      idClassroom: z.string(),
      idStudent: z.string(),
    })
  )
  .action(async ({ parsedInput: { idClassroom, idStudent } }) => {
    const classroom = await prisma.classroom.update({
      where: {
        idClassroom,
      },
      data: {
        students: {
          disconnect: {
            id: idStudent,
          },
        },
      },
    });
    return classroom;
  });

// Récupérer toutes les classes
export const getAllClassroomsAction = async () => {
  const classrooms = await prisma.classroom.findMany();
  return classrooms;
};

// Récupérer toutes les classes d'un professeur
export const getClassroomsByProfessorIdAction = authAction
  .schema(z.string())
  .action(async ({ parsedInput: professorId }) => {
    const classrooms = await prisma.classroom.findMany({
      where: {
        professorId,
      },
    });
    return classrooms;
  });

// Récupérer les étudiants d'une classe
export const getStudentsFromClassroomAction = authAction
  .schema(z.string())
  .action(async ({ parsedInput: classroomId }) => {
    const classroom = await prisma.classroom.findUnique({
      where: {
        idClassroom: classroomId,
      },
      include: {
        students: true,
      },
    });
    return classroom?.students;
  });

// Récupérer le titre d'une classe par son ID
export const getClassroomTitleByIdAction = authAction
  .schema(z.string())
  .action(async ({ parsedInput: classroomId }) => {
    const classroom = await prisma.classroom.findUnique({
      where: {
        idClassroom: classroomId,
      },
    });
    return classroom?.title;
  });

// Récupérer les classes où un élève est inscrit
export const getClassroomsByStudentIdAction = authAction
  .schema(z.string())
  .action(async ({ parsedInput: studentId }) => {
    const classrooms = await prisma.classroom.findMany({
      where: {
        students: {
          some: {
            id: studentId,
          },
        },
      },
    });
    return classrooms;
  });
