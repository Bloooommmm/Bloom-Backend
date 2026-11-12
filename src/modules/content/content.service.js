import { prisma } from '../../db/prisma.js';

export class ContentService {
  async getContentsByLessonId(lessonId) {
    const lesson = await prisma.msLesson.findUnique({
      where: { lesson_id: lessonId },
    });

    if (!lesson) {
      const error = new Error('Lesson tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    return await prisma.msContentBlock.findMany({
      where: { lesson_id: lessonId },
      orderBy: { order_index: 'asc' },
    });
  }
}