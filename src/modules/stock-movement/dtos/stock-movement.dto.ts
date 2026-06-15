import type { Type } from '@/generated/prisma/enums';

export type StockMovementDto = {
  id: number;
  createdAt: Date;
  productId: number;
  type: Type;
  quantity: number;
  notes?: string | null;
};
