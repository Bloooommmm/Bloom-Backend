import { prisma } from '../../db/prisma.js';

export class LessonService {
  async getLessonsByUnitId(unitId) {
    const unitExists = await prisma.msUnit.findUnique({
      where: { unit_id: unitId },
    });

    if (!unitExists) {
      const error = new Error('Unit tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    return await prisma.msLesson.findMany({
      where: { unit_id: unitId },
      orderBy: { order_index: 'asc' },
    });
  }

  async getLessonDetail(id) {
    const lesson = await prisma.msLesson.findUnique({
      where: { lesson_id: id },
    });

    if (!lesson) {
      const error = new Error('Lesson tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    return lesson;
  }
}