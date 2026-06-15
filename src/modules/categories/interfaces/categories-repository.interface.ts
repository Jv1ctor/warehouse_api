import type { Category } from '@/generated/prisma/client';
import type {
  CategoryCreateInput,
  CategoryUpdateInput,
} from '@/generated/prisma/models';

export interface ICategoriesRepository {
  listAll(): Promise<Category[]>;
  findById(id: number): Promise<Category | null>;
  create(data: Omit<CategoryCreateInput, 'createdAt'>): Promise<Category>;
  update(
    id: number,
    data: Omit<CategoryUpdateInput, 'createdAt' | 'id'>,
  ): Promise<Category>;
  delete(id: number): Promise<void>;
  findByName(name: string): Promise<Category | null>;
}
