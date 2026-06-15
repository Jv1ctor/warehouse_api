import { type Request, type Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import type { InputProductDto } from './dtos/input-product.dto';
import type { IProductService } from './interfaces/product-service.interface';

export const productController = (service: IProductService) => ({
  async findAll(_request: Request, response: Response) {
    const products = await service.listAll();

    response.status(200).json({
      data: products,
    });
  },

  async findById(request: Request, response: Response) {
    const { id } = request.params as { id?: string };

    if (!id) {
      throw new BadRequestError({ message: 'Dados invalidos' });
    }

    const product = await service.findById(Number(id));

    response.status(200).json({
      data: product,
    });
  },

  async create(request: Request, response: Response) {
    const { name, description, unity, minimunStock, categoryId, supplierId } =
      request.body as Partial<InputProductDto>;

    if (!name || !unity || !categoryId || !supplierId) {
      throw new BadRequestError({ message: 'Dados invalidos' });
    }

    const createdProduct = await service.create({
      name,
      description,
      unity,
      minimunStock,
      categoryId,
      supplierId,
    });

    response.status(201).json({
      data: createdProduct,
    });
  },

  async update(request: Request, response: Response) {
    const { id } = request.params as { id?: string };
    const { name, description, unity, minimunStock, categoryId, supplierId } =
      request.body as Partial<InputProductDto>;

    if (!id) {
      throw new BadRequestError({ message: 'Dados invalidos' });
    }

    const updated = await service.update(Number(id), {
      name,
      description,
      unity,
      minimunStock,
      categoryId,
      supplierId,
    });

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
