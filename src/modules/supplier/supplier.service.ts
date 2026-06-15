import { ConflictError } from '@/shared/handle-error/errors/conflict.error';
import { NotFoundError } from '@/shared/handle-error/errors/not-found.error';

import type { InputSupplierDto } from './dtos/input-supplier.dto';
import type { SupplierDto } from './dtos/supplier.dto';
import type { ISupplieRepository } from './interface/supplier-repository.interface';

export const supplierService = (deps: { repository: ISupplieRepository }) => ({
  async listAll(): Promise<SupplierDto[]> {
    return deps.repository.listAll();
  },

  async findById(id: number): Promise<SupplierDto> {
    const supplier = await deps.repository.findById(id);

    if (!supplier)
      throw new NotFoundError({ message: 'Fornecedor não encontrada' });

    return supplier;
  },

  async create(input: InputSupplierDto): Promise<SupplierDto> {
    const supplier = await deps.repository.findByCnpj(input.cnpj);

    if (supplier) {
      throw new ConflictError({ message: 'CNPJ em uso' });
    }

    const created = await deps.repository.create(input);
    return created;
  },

  async update(
    id: number,
    input: Partial<InputSupplierDto>,
  ): Promise<SupplierDto> {
    const existSupplier = await deps.repository.findById(id);

    if (!existSupplier)
      throw new NotFoundError({ message: 'Fornecedor não encontrada' });

    if (input.cnpj) {
      const existCnpj = await deps.repository.findByCnpj(input.cnpj);

      if (existCnpj) {
        throw new ConflictError({ message: 'CNPJ em uso' });
      }
    }

    return deps.repository.update(id, input);
  },

  async delete(id: number) {
    const existSupplier = await deps.repository.findById(id);

    if (!existSupplier)
      throw new NotFoundError({ message: 'Fornecedor não encontrada' });

    await deps.repository.delete(id);
  },
});
