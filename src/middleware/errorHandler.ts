import type { ErrorRequestHandler } from "express";
import { Prisma } from "../generated/prisma/client.js";
import { AppError } from "../utils/index.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") return res.status(404).json({ success: false, message: "Resource is not found" });
    if (error.code === "P2002") return res.status(409).json({ success: false, message: "Resource already exists" });
  }

  const appError = error instanceof AppError ? error : new AppError("Internal Server Error", 500);
  if (!(error instanceof AppError)) console.error(error);
  return res.status(appError.statusCode).json({ success: false, message: appError.message, ...(appError.details ? { details: appError.details } : {}) });
};
