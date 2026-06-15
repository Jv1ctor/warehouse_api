import type { Supplier } from '@/generated/prisma/browser';
import type {
  SupplierCreateInput,
  SupplierUpdateInput,
} from '@/generated/prisma/models';

export interface ISupplieRepository {
  listAll(): Promise<Supplier[]>;
  findById(id: number): Promise<Supplier | null>;
  findByCnpj(cnpj: string): Promise<Supplier | null>;
  create(
    data: Omit<SupplierCreateInput, 'createdAt' | 'id'>,
  ): Promise<Supplier>;
  update(
    id: number,
    data: Omit<SupplierUpdateInput, 'createdAt'>,
  ): Promise<Supplier>;
  delete(id: number): Promise<void>;
}
