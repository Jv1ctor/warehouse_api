import { type Request, type Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import type { InputCategoryDto } from './dtos/input-category.dto';
import type { ICategoriesService } from './interfaces/categories-service.interface';

export const categoriesController = (service: ICategoriesService) => ({
  async findAll(request: Request, response: Response) {
    const categories = await service.listAll();

    response.status(200).json({
      data: categories,
    });
  },

  async findById(request: Request, response: Response) {
    const { id } = request.params as { id?: string };

    if (!id) {
      throw new BadRequestError({ message: 'Dados invalidos' });
    }

    const category = await service.findById(Number(id));

    response.status(200).json({
      data: category,
    });
  },

  async create(request: Request, response: Response) {
    const { description, name } = request.body as Partial<InputCategoryDto>;

    if (!name) {
      throw new BadRequestError({ message: 'Dados invalidos' });
    }

    const createdCategory = await service.create({ name, description });

    response.status(201).json({
      data: createdCategory,
    });
  },

  async update(request: Request, response: Response) {
    const { id } = request.params as { id?: string };
    const { description, name } = request.body as Partial<InputCategoryDto>;

    if (!id) {
      throw new BadRequestError({ message: 'Dados invalidos' });
    }

    const updated = await service.update(Number(id), { description, name });

    response.status(200).json({ data: updated });
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params as { id?: string };

    if (!id) {
      throw new BadRequestError({ message: 'Dados invalidos' });
    }

    await service.delete(Number(id));

    response.status(204).send();
  },
});
