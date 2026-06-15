import type { StockMovement } from '@/generated/prisma/browser';
import type { StockMovementCreateInput } from '@/generated/prisma/models';

export interface IStockMovementRepository {
  listAll(): Promise<StockMovement[]>;
  findById(id: number): Promise<StockMovement | null>;
  listAllByProduct(productId: number): Promise<StockMovement[]>;
  create(
    data: Omit<StockMovementCreateInput, 'id' | 'createdAt'>,
  ): Promise<StockMovement>;
}
