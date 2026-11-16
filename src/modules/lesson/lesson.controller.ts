import type { Request, Response } from "express";
import { listResponse, singleResponse } from "../../utils/index.js";
import { lessonService } from "./lesson.service.js";

export const lessonController = {
  async create(req: Request, res: Response) { res.status(201).json(singleResponse(await lessonService.create(req.body))); },
  async list(req: Request, res: Response) { const lessons = await lessonService.list(req.query.all === "true"); res.json(listResponse(lessons)); },
  async getBySlug(req: Request, res: Response) { res.json(singleResponse(await lessonService.getBySlug(String(req.params.slug)))); },
  async update(req: Request, res: Response) { res.json(singleResponse(await lessonService.update(String(req.params.id), req.body))); },
  async delete(req: Request, res: Response) { await lessonService.delete(String(req.params.id)); res.status(204).send(); },
};
