import type { Request, Response } from "express";
import { listResponse, singleResponse } from "../../utils/index.js";
import { trackingService } from "./tracking.service.js";

async function userId(req: Request) { if (!req.firebaseUser?.uid) throw new Error("Authenticated user is missing"); return trackingService.resolveUser(req.firebaseUser.uid); }
export const trackingController = {
  async periods(req: Request, res: Response) { res.json(listResponse(await trackingService.periods(await userId(req)))); },
  async createPeriod(req: Request, res: Response) { res.status(201).json(singleResponse(await trackingService.createPeriod(await userId(req), req.body))); },
  async finishPeriod(req: Request, res: Response) { res.json(singleResponse(await trackingService.finishPeriod(await userId(req), String(req.params.id), req.body))); },
  async moods(req: Request, res: Response) { res.json(listResponse(await trackingService.moods(await userId(req)))); },
  async upsertMood(req: Request, res: Response) { res.json(singleResponse(await trackingService.upsertMood(await userId(req), req.body))); },
};
