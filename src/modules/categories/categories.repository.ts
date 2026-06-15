import type { Category } from '@/generated/prisma/browser';
import type {
  CategoryCreateInput,
  CategoryUpdateInput,
} from '@/generated/prisma/models';
import { prisma } from '@/shared/database/prisma';

import type { ICategoriesRepository } from './interfaces/categories-repository.interface';

export const categoriesRepository: ICategoriesRepository = {
  async listAll(): Promise<Category[]> {
    return prisma.category.findMany();
  },

  async findById(id: number): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { id },
    });
  },

  async findByName(name: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { name },
    });
  },

  async create(
    data: Omit<CategoryCreateInput, 'createdAt' | 'id'>,
  ): Promise<Category> {
    return prisma.category.create({
      data,
    });
  },

  async update(
    id: number,
    data: Omit<CategoryUpdateInput, 'createdAt'>,
  ): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data,
    });
  },

  async delete(id: number): Promise<void> {
    await prisma.category.delete({
      where: { id },
    });
  },
};
