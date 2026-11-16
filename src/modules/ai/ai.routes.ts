import { Router } from "express";
import { asyncHandler } from "../../utils/index.js";
import { aiController } from "./ai.controller.js";

const router = Router();
router.post("/insight", asyncHandler(aiController.getInsight));
export default router;
