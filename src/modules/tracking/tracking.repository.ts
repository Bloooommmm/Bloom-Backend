import { prisma } from "../../config/index.js";

export const trackingRepository = {
  listPeriods(userId: string) { return prisma.trPeriod.findMany({ where: { userId }, orderBy: { startDate: "desc" } }); },
  createPeriod(userId: string, data: { startDate: Date; endDate?: Date }) { return prisma.trPeriod.create({ data: { userId, ...data } }); },
  updatePeriod(userId: string, id: string, data: { endDate?: Date }) { return prisma.trPeriod.updateMany({ where: { id, userId }, data }); },
  listMoods(userId: string) { return prisma.trMood.findMany({ where: { userId }, orderBy: { loggedAt: "desc" } }); },
  upsertMood(userId: string, data: { mood: string; note?: string; loggedAt: Date }) { return prisma.trMood.upsert({ where: { userId_loggedAt: { userId, loggedAt: data.loggedAt } }, create: { userId, ...data }, update: { mood: data.mood, note: data.note } }); },
};
