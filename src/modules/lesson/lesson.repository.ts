import { prisma } from "../../config/index.js";

export const lessonRepository = {
  create(data: { title: string; slug: string; content: string; estimatedReadTime: number; isPublished: boolean }) {
    return prisma.msLesson.create({ data });
  },
  findAll(onlyPublished: boolean) {
    return prisma.msLesson.findMany({ where: onlyPublished ? { isPublished: true } : undefined, orderBy: { createdAt: "desc" } });
  },
  findBySlug(slug: string) {
    return prisma.msLesson.findUnique({ where: { slug } });
  },
  update(id: string, data: { title?: string; content?: string; estimatedReadTime?: number; isPublished?: boolean }) {
    return prisma.msLesson.update({ where: { id }, data });
  },
  delete(id: string) {
    return prisma.msLesson.delete({ where: { id } });
  },
};
