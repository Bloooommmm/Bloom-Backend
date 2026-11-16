import { AppError } from "../../utils/index.js";
import { prisma } from "../../config/index.js";
import { trackingRepository } from "./tracking.repository.js";

function date(value: unknown) { const parsed = typeof value === "string" ? new Date(`${value}T00:00:00.000Z`) : null; if (!parsed || Number.isNaN(parsed.valueOf())) throw new AppError("A valid date is required", 400); return parsed; }
export const trackingService = {
  async resolveUser(firebaseUid: string) { const user = await prisma.msUser.findUnique({ where: { firebaseUid }, select: { id: true } }); if (!user) throw new AppError("User profile is not synced", 409); return user.id; },
  periods(userId: string) { return trackingRepository.listPeriods(userId); },
  createPeriod(userId: string, body: { startDate?: unknown; endDate?: unknown }) { const startDate = date(body.startDate); const endDate = body.endDate === undefined ? undefined : date(body.endDate); if (endDate && endDate < startDate) throw new AppError("End date must be after start date", 400); return trackingRepository.createPeriod(userId, { startDate, ...(endDate ? { endDate } : {}) }); },
  moods(userId: string) { return trackingRepository.listMoods(userId); },
  upsertMood(userId: string, body: { mood?: unknown; note?: unknown; loggedAt?: unknown }) { if (typeof body.mood !== "string" || !body.mood.trim()) throw new AppError("Mood is required", 400); return trackingRepository.upsertMood(userId, { mood: body.mood.trim(), note: typeof body.note === "string" ? body.note.trim() : undefined, loggedAt: date(body.loggedAt) }); },
};
