import type { Product } from '@/generated/prisma/browser';
import type {
  ProductUncheckedCreateInput,
  ProductUncheckedUpdateInput,
} from '@/generated/prisma/models';
import { prisma } from '@/shared/database/prisma';

import type { IProductRepository } from './interfaces/product-repository.interface';

export const productRepository: IProductRepository = {
  async listAll(): Promise<Product[]> {
    return prisma.product.findMany();
  },

  async findById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
    });
  },

  async create(
    data: Omit<
      ProductUncheckedCreateInput,
      'createdAt' | 'currentStock' | 'id'
    >,
  ): Promise<Product> {
    return prisma.product.create({
      data,
    });
  },

  async update(
    id: number,
    data: Omit<ProductUncheckedUpdateInput, 'createdAt' | 'id'>,
  ): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data,
    });
  },

  async delete(id: number): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  },
};
