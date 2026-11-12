import { prisma } from '../../db/prisma.js';

export class UnitService {
  async getAllUnits() {
    return await prisma.msUnit.findMany({
      orderBy: { unit_id: 'asc' },
    });
  }

  async getUnitDetail(id) {
    const unit = await prisma.msUnit.findUnique({
      where: { unit_id: id },
    });

    if (!unit) {
      const error = new Error('Unit is not found');
      error.statusCode = 404;
      throw error;
    }

    return unit;
  }
}