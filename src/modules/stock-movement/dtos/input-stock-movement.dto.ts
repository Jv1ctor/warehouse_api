import type { Type } from '@/generated/prisma/enums';

export type InputStockMovementDto = {
  productId: number;
  type: Type;
  quantity: number;
  notes?: string | null;
};
