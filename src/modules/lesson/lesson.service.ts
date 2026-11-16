import { AppError } from "../../utils/index.js";
import { lessonRepository } from "./lesson.repository.js";

function calculateReadTime(text: string) {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

function generateSlug(title: string) {
  return `${title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-")}-${Date.now().toString(36)}`;
}

export const lessonService = {
  create(data: { title?: unknown; content?: unknown; isPublished?: unknown }) {
    if (typeof data.title !== "string" || !data.title.trim()) throw new AppError("A lesson title is required", 400);
    if (typeof data.content !== "string" || !data.content.trim()) throw new AppError("Lesson content is required", 400);
    return lessonRepository.create({ title: data.title.trim(), slug: generateSlug(data.title), content: data.content, estimatedReadTime: calculateReadTime(data.content), isPublished: data.isPublished !== false });
  },
  list(showAll: boolean) {
    return lessonRepository.findAll(!showAll);
  },
  async getBySlug(slug: string) {
    const lesson = await lessonRepository.findBySlug(slug);
    if (!lesson) throw new AppError("Lesson is not found", 404);
    return lesson;
  },
  update(id: string, data: { title?: unknown; content?: unknown; isPublished?: unknown }) {
    if (data.title !== undefined && (typeof data.title !== "string" || !data.title.trim())) throw new AppError("A lesson title is required", 400);
    if (data.content !== undefined && (typeof data.content !== "string" || !data.content.trim())) throw new AppError("Lesson content is required", 400);
    return lessonRepository.update(id, {
      ...(data.title !== undefined ? { title: data.title as string } : {}),
      ...(data.content !== undefined ? { content: data.content as string, estimatedReadTime: calculateReadTime(data.content as string) } : {}),
      ...(data.isPublished !== undefined ? { isPublished: data.isPublished === true } : {}),
    });
  },
  delete(id: string) {
    return lessonRepository.delete(id);
  },
};
