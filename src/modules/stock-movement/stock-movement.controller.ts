import { type Request, type Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import type { InputStockMovementDto } from './dtos/input-stock-movement.dto';
import type { IStockMovementService } from './interface/stock-movement-service.interface';

export const stockMovementController = (service: IStockMovementService) => ({
  async findAll(_request: Request, response: Response) {
    const movements = await service.listAll();

    response.status(200).json({
      data: movements,
    });
  },

  async findById(request: Request, response: Response) {
    const { id } = request.params as { id?: string };

    if (!id) {
      throw new BadRequestError({ message: 'Dados invalidos' });
    }

    const movement = await service.findByid(Number(id));

    response.status(200).json({
      data: movement,
    });
  },

  async findByProductId(request: Request, response: Response) {
    const { productId } = request.params as { productId?: string };

    if (!productId) {
      throw new BadRequestError({ message: 'Dados invalidos' });
    }

    const movements = await service.ListAllByProduct(Number(productId));

    response.status(200).json({
      data: movements,
    });
  },

  async create(request: Request, response: Response) {
    const { productId, type, quantity, notes } =
      request.body as Partial<InputStockMovementDto>;

    if (!productId || !type || quantity === undefined || quantity === null) {
      throw new BadRequestError({ message: 'Dados invalidos' });
    }

    const createdMovement = await service.create({
      productId,
      type,
      quantity,
      notes,
    });

    response.status(201).json({
      data: createdMovement,
    });
  },
});
