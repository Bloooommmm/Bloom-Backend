import type { Request, Response } from "express";
import { AppError, singleResponse } from "../../utils/index.js";
import { aiService } from "./ai.service.js";

export const aiController = {
  async getInsight(req: Request, res: Response) {
    const { mood, symptoms, cyclePhase, extraNotes } = req.body;
    if (!mood || !symptoms) throw new AppError("Fields mood and symptoms are required", 400);
    res.json(singleResponse(await aiService.generateCycleInsight({ mood, symptoms, cyclePhase, extraNotes })));
  },
};
