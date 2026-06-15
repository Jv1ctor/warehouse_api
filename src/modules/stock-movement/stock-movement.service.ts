import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { IProductRepository } from '../product/interfaces/product-repository.interface';
import type { InputStockMovementDto } from './dtos/input-stock-movement.dto';
import type { StockMovementDto } from './dtos/stock-movement.dto';
import type { IStockMovementRepository } from './interface/stock-movement-repository.interface';

export const stockMovementService = (deps: {
  smRepo: IStockMovementRepository;
  productRepo: IProductRepository;
}) => ({
  async listAll(): Promise<StockMovementDto[]> {
    return deps.smRepo.listAll();
  },

  async findByid(id: number): Promise<StockMovementDto> {
    const stock = await deps.smRepo.findById(id);

    if (!stock) {
      throw new NotFoundError({
        message: 'Movimento de estoque não encontrado',
      });
    }

    return stock;
  },

  async ListAllByProduct(productId: number): Promise<StockMovementDto[]> {
    return deps.smRepo.listAllByProduct(productId);
  },

  async create(input: InputStockMovementDto): Promise<StockMovementDto> {
    const product = await deps.productRepo.findById(input.productId);

    if (!product) {
      throw new NotFoundError({ message: 'Produto não encontrado' });
    }

    if (input.type === 'IN') {
      product.currentStock += input.quantity;
    } else if (input.type === 'OUT') {
      if (product.currentStock < input.quantity) {
        throw new BadRequestError({
          message: 'Estoque insuficiente',
        });
      }

      product.currentStock -= input.quantity;
    }

    await deps.productRepo.update(product.id, {
      currentStock: product.currentStock,
    });

    return deps.smRepo.create({
      quantity: input.quantity,
      type: input.type,
      notes: input.notes,
      product: { connect: { id: input.productId } },
    });
  },
});
