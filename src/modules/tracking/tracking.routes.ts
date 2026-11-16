import { Router } from "express";
import { asyncHandler } from "../../utils/index.js";
import { firebaseAuth } from "../../middleware/index.js";
import { trackingController } from "./tracking.controller.js";

const router = Router();
router.use(firebaseAuth);
router.get("/periods", asyncHandler(trackingController.periods));
router.post("/periods", asyncHandler(trackingController.createPeriod));
router.patch("/periods/:id", asyncHandler(trackingController.finishPeriod));
router.get("/moods", asyncHandler(trackingController.moods));
router.put("/moods", asyncHandler(trackingController.upsertMood));
export default router;
