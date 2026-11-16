import { AppError } from "../../utils/index.js";
import { prisma } from "../../config/index.js";
import { trackingRepository } from "./tracking.repository.js";

export function parseDate(value: unknown) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new AppError("A valid date is required (YYYY-MM-DD)", 400);
  const parsed = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value) throw new AppError("A valid date is required", 400);
  return parsed;
}
function loggedDate(value: unknown) {
  const date = parseDate(value);
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  if (date > parseDate(today)) throw new AppError("A logged period cannot be in the future", 400);
  return date;
}
function input(body: unknown): Record<string, unknown> {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new AppError("A JSON object is required", 400);
  return body as Record<string, unknown>;
}
export const trackingService = {
  async resolveUser(firebaseUid: string) { const user = await prisma.msUser.findUnique({ where: { firebaseUid }, select: { id: true } }); if (!user) throw new AppError("User profile is not synced", 409); return user.id; },
  periods(userId: string) { return trackingRepository.listPeriods(userId); },
  createPeriod(userId: string, raw: unknown) {
    const body = input(raw);
    const startDate = loggedDate(body.startDate);
    const endDate = body.endDate == null ? null : loggedDate(body.endDate);
    if (endDate && endDate < startDate) throw new AppError("End date cannot be before start date", 400);
    return trackingRepository.createPeriod(userId, { startDate, endDate });
  },
  finishPeriod(userId: string, id: string, raw: unknown) {
    const body = input(raw);
    if (body.startDate === undefined && body.endDate === undefined) throw new AppError("Provide a start or end date to update", 400);
    return trackingRepository.updatePeriod(userId, id, {
      ...(body.startDate === undefined ? {} : { startDate: loggedDate(body.startDate) }),
      ...(body.endDate === undefined ? {} : { endDate: body.endDate === null ? null : loggedDate(body.endDate) }),
    });
  },
  deletePeriod(userId: string, id: string) { return trackingRepository.deletePeriod(userId, id); },
  moods(userId: string) { return trackingRepository.listMoods(userId); },
  upsertMood(userId: string, body: { mood?: unknown; note?: unknown; loggedAt?: unknown }) { if (typeof body.mood !== "string" || !body.mood.trim()) throw new AppError("Mood is required", 400); return trackingRepository.upsertMood(userId, { mood: body.mood.trim(), note: typeof body.note === "string" ? body.note.trim() : undefined, loggedAt: parseDate(body.loggedAt) }); },
};
