import { Router } from "express";
import { asyncHandler } from "../../utils/index.js";
import { lessonController } from "./lesson.controller.js";

const router = Router();
router.post("/", asyncHandler(lessonController.create));
router.get("/", asyncHandler(lessonController.list));
router.get("/:slug", asyncHandler(lessonController.getBySlug));
router.patch("/:id", asyncHandler(lessonController.update));
router.delete("/:id", asyncHandler(lessonController.delete));
export default router;
