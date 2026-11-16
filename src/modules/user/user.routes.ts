import { Router } from "express";
import { asyncHandler } from "../../utils/index.js";
import { userController } from "./user.controller.js";
import { firebaseAuth } from "../../middleware/index.js";

const router = Router();
router.use(firebaseAuth);
router.get("/me", asyncHandler(userController.me));
export default router;
