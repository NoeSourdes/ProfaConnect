"use server";

import { prisma } from "@/src/lib/prisma";
import { userAction } from "@/src/lib/safe-actions";
import { z } from "zod";
import { createClassroomSchema } from "./classroom.schema";

//                    les creations

export const createClassroomAction = userAction(
  createClassroomSchema,
  async (inputs, context) => {
    const classroom = await prisma.classroom.create({
      data: {
        ...inputs,
        professorId: context.user.id,
      },
    });
    return classroom;
  }
);

//                      delete

// supprimer une classe

export const deleteClassroomAction = userAction(
  z.string(),
  async (classroomId) => {
    const classroom = await prisma.classroom.delete({
      where: {
        idClassroom: classroomId,
      },
    });
    return classroom;
  }
);

//                    les updates

export const updateCLassroomAddStudent = userAction(
  z.object({
    idClassroom: z.string(),
    idStudent: z.string(),
  }),
  async ({ idClassroom, idStudent }) => {
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
  }
);

export const updateCLassroomDeleteStudent = userAction(
  z.object({
    idClassroom: z.string(),
    idStudent: z.string(),
  }),
  async ({ idClassroom, idStudent }) => {
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
  }
);

//             les get

// recuperer toutes les classes

export const getAllClassroomsAction = async () => {
  const classrooms = await prisma.classroom.findMany();
  return classrooms;
};

// recuperer toutes les classes d'un professeur

export const getClassroomsByProfessorIdAction = userAction(
  z.string(),
  async (professorId) => {
    const classrooms = await prisma.classroom.findMany({
      where: {
        professorId,
      },
    });
    return classrooms;
  }
);

// recuperer les students d'une classe

export const getStudentsFromClassroomAction = userAction(
  z.string(),
  async (classroomId) => {
    const classroom = await prisma.classroom.findUnique({
      where: {
        idClassroom: classroomId,
      },
      include: {
        students: true,
      },
    });
    return classroom?.students;
  }
);

// recuperer le nom d'une classe par son id

export const getClassroomTitleByIdAction = userAction(
  z.string(),
  async (classroomId) => {
    const classroom = await prisma.classroom.findUnique({
      where: {
        idClassroom: classroomId,
      },
    });
    return classroom?.title;
  }
);

//recuperer les classes ou un eleves est inscrit

export const getClassroomsByStudentIdAction = userAction(
  z.string(),
  async (studentId) => {
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
  }
);
