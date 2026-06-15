import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';
import { ConflictError } from '@/shared/handle-error/errors/conflict.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';
import { validateUnity } from '@/shared/utils/validation-unity';

import type { ICategoriesRepository } from '../categories/interfaces/categories-repository.interface';
import type { IStockMovementRepository } from '../stock-movement/interface/stock-movement-repository.interface';
import type { ISupplieRepository } from '../supplier/interface/supplier-repository.interface';
import type { InputProductDto } from './dtos/input-product.dto';
import type { ProductDto } from './dtos/product.dto';
import type { IProductRepository } from './interfaces/product-repository.interface';

export const productService = (deps: {
  productRepo: IProductRepository;
  supplierRepo: ISupplieRepository;
  categoryRepo: ICategoriesRepository;
  smRepo: IStockMovementRepository;
}) => ({
  async listAll(): Promise<ProductDto[]> {
    return deps.productRepo.listAll();
  },

  async findById(id: number): Promise<ProductDto> {
    const product = await deps.productRepo.findById(id);

    if (!product) {
      throw new NotFoundError({ message: 'Produto não encontrado' });
    }

    return product;
  },

  async create(input: InputProductDto): Promise<ProductDto> {
    if (!validateUnity(input.unity)) {
      throw new BadRequestError({ message: 'Unidade deve ser un, kg ou L' });
    }

    const category = await deps.categoryRepo.findById(input.categoryId);

    if (!category) {
      throw new NotFoundError({ message: 'Categoria não encontrada' });
    }

    const supplier = await deps.supplierRepo.findById(input.supplierId);

    if (!supplier) {
      throw new NotFoundError({ message: 'Fornecedor não encontrado' });
    }

    const created = await deps.productRepo.create({
      name: input.name,
      description: input.description,
      unity: input.unity,
      minimunStock: input.minimunStock,
      categoryId: input.categoryId,
      supplierId: input.supplierId,
    });

    return created;
  },

  async update(
    id: number,
    input: Partial<InputProductDto>,
  ): Promise<ProductDto> {
    const existProduct = await deps.productRepo.findById(id);

    if (!existProduct) {
      throw new NotFoundError({ message: 'Produto não encontrado' });
    }

    if (input.unity && !validateUnity(input.unity)) {
      throw new BadRequestError({ message: 'Unidade deve ser un, kg ou L' });
    }

    if (input.categoryId) {
      const category = await deps.categoryRepo.findById(input.categoryId);

      if (!category) {
        throw new NotFoundError({ message: 'Categoria não encontrada' });
      }
    }

    if (input.supplierId) {
      const supplier = await deps.supplierRepo.findById(input.supplierId);

      if (!supplier) {
        throw new NotFoundError({ message: 'Fornecedor não encontrado' });
      }
    }

    return deps.productRepo.update(id, {
      name: input.name,
      description: input.description,
      unity: input.unity,
      minimunStock: input.minimunStock,
      categoryId: input.categoryId,
      supplierId: input.supplierId,
    });
  },

  async delete(id: number): Promise<void> {
    const existProduct = await deps.productRepo.findById(id);

    if (!existProduct) {
      throw new NotFoundError({ message: 'Produto não encontrado' });
    }

    const relationExist = await deps.smRepo.listAllByProduct(id);

    if (relationExist.length > 0) {
      throw new ConflictError({
        message: 'Não é possivel deletar, produto em uso',
      });
    }

    await deps.productRepo.delete(id);
  },
});
