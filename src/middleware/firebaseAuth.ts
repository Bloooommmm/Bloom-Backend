import type { NextFunction, Request, Response } from "express";
import { verifyFirebaseToken } from "../config/index.js";

declare global {
  namespace Express { interface Request { firebaseUser?: { uid: string; email?: string; name?: string } } }
}

export async function firebaseAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.header("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) return res.status(401).json({ success: false, message: "Bearer token is required" });
  try {
    const decoded = await verifyFirebaseToken(token);
    req.firebaseUser = { uid: decoded.uid, email: decoded.email, name: decoded.name };
    return next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired Firebase token" });
  }
}
