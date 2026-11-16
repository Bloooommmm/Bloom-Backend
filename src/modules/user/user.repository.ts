import { prisma } from "../../config/index.js";

const publicUser = { id: true, email: true, name: true, createdAt: true, updatedAt: true } as const;

export const userRepository = {
  create(data: { email: string; name?: string; password?: string }) {
    return prisma.msUser.create({ data, select: publicUser });
  },
  findAll() {
    return prisma.msUser.findMany({ select: publicUser, orderBy: { createdAt: "desc" } });
  },
  findById(id: string) {
    return prisma.msUser.findUnique({ where: { id }, select: publicUser });
  },
  update(id: string, data: { email?: string; name?: string; password?: string }) {
    return prisma.msUser.update({ where: { id }, data, select: publicUser });
  },
  delete(id: string) {
    return prisma.msUser.delete({ where: { id } });
  },
};
