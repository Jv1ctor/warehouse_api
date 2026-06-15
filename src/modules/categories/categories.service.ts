import { ConflictError } from '@/shared/handle-error/errors/conflict.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { CategoryDto } from './dtos/category.dto';
import type { InputCategoryDto } from './dtos/input-category.dto';
import type { ICategoriesRepository } from './interfaces/categories-repository.interface';

export const categoriesService = (deps: {
  repository: ICategoriesRepository;
}) => ({
  async listAll(): Promise<CategoryDto[]> {
    return deps.repository.listAll();
  },

  async findById(id: number): Promise<CategoryDto> {
    const category = await deps.repository.findById(id);

    if (!category)
      throw new NotFoundError({ message: 'Categoria não encontrada' });

    return category;
  },

  async create(input: InputCategoryDto): Promise<CategoryDto> {
    const category = await deps.repository.findByName(input.name);

    if (category) {
      throw new ConflictError({ message: 'Nome já utilizado em categoria' });
    }

    const created = await deps.repository.create(input);
    return created;
  },

  async update(
    id: number,
    input: Partial<InputCategoryDto>,
  ): Promise<CategoryDto> {
    const existCategory = await deps.repository.findById(id);

    if (!existCategory)
      throw new NotFoundError({ message: 'Categoria não encontrada' });

    if (input.name) {
      const existName = await deps.repository.findByName(input.name);

      if (existName) {
        throw new ConflictError({ message: 'Nome já utilizado em categoria' });
      }
    }

    return await deps.repository.update(id, input);
  },

  async delete(id: number) {
    const existCategory = await deps.repository.findById(id);

    if (!existCategory)
      throw new NotFoundError({ message: 'Categoria não encontrada' });

    await deps.repository.delete(id);
  },
});
