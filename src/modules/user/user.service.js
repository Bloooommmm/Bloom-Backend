import { prisma } from '../../db/prisma'

const userService = {
  async createUser(data) {
    return prisma.msUser.create({
      data,
      select: { id: true, email: true, name: true, createdAt: true },
    });
  },

  async getAllUsers() {
    return prisma.msUser.findMany({
      select: { id: true, email: true, name: true, avatarUrl: true, createdAt: true },
    });
  },

  async getUserById(id) {
    return prisma.msUser.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, createdAt: true },
    });
  },

  async updateUser(id, data) {
    return prisma.msUser.update({
      where: { id },
      data,
      select: { id: true, email: true, name: true, updatedAt: true },
    });
  },

  async deleteUser(id) {
    return prisma.msUser.delete({
      where: { id },
    });
  },
};

module.exports = userService;