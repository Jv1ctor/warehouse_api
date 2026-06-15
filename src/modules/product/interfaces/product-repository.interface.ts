import type { Product } from '@/generated/prisma/browser';
import type {
  ProductUncheckedCreateInput,
  ProductUncheckedUpdateInput,
} from '@/generated/prisma/models';

export interface IProductRepository {
  listAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  create(
    data: Omit<
      ProductUncheckedCreateInput,
      'createdAt' | 'currentStock' | 'id'
    >,
  ): Promise<Product>;
  update(
    id: number,
    data: Omit<ProductUncheckedUpdateInput, 'createdAt' | 'id'>,
  ): Promise<Product>;
  delete(id: number): Promise<void>;
}
