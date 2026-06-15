import type { StockMovement } from '@/generated/prisma/browser';
import type { StockMovementCreateInput } from '@/generated/prisma/models';
import { prisma } from '@/shared/database/prisma';

import type { IStockMovementRepository } from './interface/stock-movement-repository.interface';

export const stockMovementRepository: IStockMovementRepository = {
  async listAll(): Promise<StockMovement[]> {
    return prisma.stockMovement.findMany();
  },

  async findById(id: number): Promise<StockMovement | null> {
    return prisma.stockMovement.findUnique({ where: { id } });
  },

  async listAllByProduct(productId: number): Promise<StockMovement[]> {
    return prisma.stockMovement.findMany({
      where: { productId },
    });
  },

  async create(
    data: Omit<StockMovementCreateInput, 'id' | 'createdAt'>,
  ): Promise<StockMovement> {
    return prisma.stockMovement.create({
      data,
    });
  },
};
