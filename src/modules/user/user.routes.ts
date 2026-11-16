import { Router } from "express";
import { asyncHandler } from "../../utils/index.js";
import { userController } from "./user.controller.js";

const router = Router();
router.post("/", asyncHandler(userController.create));
router.get("/", asyncHandler(userController.list));
router.get("/:id", asyncHandler(userController.get));
router.patch("/:id", asyncHandler(userController.update));
router.delete("/:id", asyncHandler(userController.delete));
export default router;
