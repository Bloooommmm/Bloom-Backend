import { prisma } from "../../config/index.js";
import { AppError } from "../../utils/index.js";

type PeriodDates = { startDate: Date; endDate: Date | null };

export function assertPeriodRange(data: PeriodDates, others: PeriodDates[]) {
  if (data.endDate && data.endDate < data.startDate) throw new AppError("End date cannot be before start date", 400);
  if (others.some(p => !p.endDate && !data.endDate)) throw new AppError("Finish or edit your ongoing period first", 409);
  if (others.some(p => data.startDate <= (p.endDate ?? new Date("9999-12-31")) && p.startDate <= (data.endDate ?? new Date("9999-12-31")))) {
    throw new AppError("These dates overlap another period. Edit that period instead.", 409);
  }
}

export const trackingRepository = {
  listPeriods(userId: string) { return prisma.trPeriod.findMany({ where: { userId }, orderBy: [{ startDate: "desc" }, { updatedAt: "desc" }], distinct: ["startDate"] }); },
  createPeriod(userId: string, data: PeriodDates) {
    return prisma.$transaction(async tx => {
      // Serialize writes per account so simultaneous retries cannot create duplicates.
      await tx.$queryRaw`SELECT id FROM "MsUser" WHERE id = ${userId} FOR UPDATE`;
      const periods = await tx.trPeriod.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
      const existing = periods.find(p => p.startDate.getTime() === data.startDate.getTime());
      if (existing) return existing;
      assertPeriodRange(data, periods);
      return tx.trPeriod.create({ data: { userId, ...data } });
    });
  },
  updatePeriod(userId: string, id: string, changes: Partial<PeriodDates>) {
    return prisma.$transaction(async tx => {
      await tx.$queryRaw`SELECT id FROM "MsUser" WHERE id = ${userId} FOR UPDATE`;
      const periods = await tx.trPeriod.findMany({ where: { userId } });
      const existing = periods.find(p => p.id === id);
      if (!existing) throw new AppError("Period is not found", 404);
      const data = { startDate: changes.startDate ?? existing.startDate, endDate: changes.endDate === undefined ? existing.endDate : changes.endDate };
      assertPeriodRange(data, periods.filter(p => p.id !== id));
      return tx.trPeriod.update({ where: { id }, data });
    });
  },
  async deletePeriod(userId: string, id: string) {
    const result = await prisma.trPeriod.deleteMany({ where: { id, userId } });
    if (!result.count) throw new AppError("Period is not found", 404);
    return { id };
  },
  listMoods(userId: string) { return prisma.trMood.findMany({ where: { userId }, orderBy: { loggedAt: "desc" } }); },
  upsertMood(userId: string, data: { mood: string; note?: string; loggedAt: Date }) { return prisma.trMood.upsert({ where: { userId_loggedAt: { userId, loggedAt: data.loggedAt } }, create: { userId, ...data }, update: { mood: data.mood, note: data.note } }); },
};
