import { Router } from "express";
import { asyncHandler } from "../../utils/index.js";
import { aiController } from "./ai.controller.js";
import { firebaseAuth } from "../../middleware/index.js";

const router = Router();
router.use(firebaseAuth);
router.post("/insight", asyncHandler(aiController.getInsight));
export default router;
