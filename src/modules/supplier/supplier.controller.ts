import { type Request, type Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import type { InputSupplierDto } from './dtos/input-supplier.dto';
import type { ISupplieService } from './interface/supplier-service.interface';

export const supplierController = (service: ISupplieService) => ({
  async findAll(_request: Request, response: Response) {
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
    const { cnpj, email, name, phone } =
      request.body as Partial<InputSupplierDto>;

    if (!name || !cnpj) {
      throw new BadRequestError({ message: 'Dados invalidos' });
    }

    const createdSupplier = await service.create({ name, email, phone, cnpj });

    response.status(201).json({
      data: createdSupplier,
    });
  },

  async update(request: Request, response: Response) {
    const { id } = request.params as { id?: string };
    const { cnpj, email, phone, name } =
      request.body as Partial<InputSupplierDto>;

    if (!id) {
      throw new BadRequestError({ message: 'Dados invalidos' });
    }

    const updated = await service.update(Number(id), {
      cnpj,
      email,
      phone,
      name,
    });
    response.status(201).json({ data: updated });
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
