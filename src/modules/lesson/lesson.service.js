import { prisma } from '../../db/prisma'

function calculateReadTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function generateSlug(title) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') +
    '-' +
    Date.now().toString(36)
  );
}

const lessonService = {
  async createLesson(data) {
    const slug = generateSlug(data.title);
    const estimatedReadTime = calculateReadTime(data.content);

    return prisma.msLesson.create({
      data: {
        title: data.title,
        slug,
        content: data.content,
        estimatedReadTime,
        isPublished: data.isPublished !== undefined ? data.isPublished : true,
      },
    });
  },

  async getAllLessons(onlyPublished = true) {
    return prisma.msLesson.findMany({
      where: onlyPublished ? { isPublished: true } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  },

  async getLessonBySlug(slug) {
    return prisma.msLesson.findUnique({
      where: { slug },
    });
  },

  async updateLesson(id, data) {
    const updateData = { ...data };

    if (data.content) {
      updateData.estimatedReadTime = calculateReadTime(data.content);
    }

    return prisma.msLesson.update({
      where: { id },
      data: updateData,
    });
  },

  async deleteLesson(id) {
    return prisma.msLesson.delete({
      where: { id },
    });
  },
};

module.exports = lessonService;