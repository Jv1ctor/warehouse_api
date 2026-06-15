import type { Supplier } from '@/generated/prisma/browser';
import type {
  SupplierCreateInput,
  SupplierUpdateInput,
} from '@/generated/prisma/models';
import { prisma } from '@/shared/database/prisma';

export const supplierRepository = {
  async listAll(): Promise<Supplier[]> {
    return prisma.supplier.findMany();
  },

  async findById(id: number): Promise<Supplier | null> {
    return prisma.supplier.findUnique({
      where: { id },
    });
  },

  async findByCnpj(cnpj: string): Promise<Supplier | null> {
    return prisma.supplier.findUnique({
      where: { cnpj },
    });
  },

  async create(
    data: Omit<SupplierCreateInput, 'createdAt' | 'id'>,
  ): Promise<Supplier> {
    return prisma.supplier.create({
      data,
    });
  },

  async update(
    id: number,
    data: Omit<SupplierUpdateInput, 'createdAt'>,
  ): Promise<Supplier> {
    return prisma.supplier.update({
      where: { id },
      data,
    });
  },

  async delete(id: number): Promise<void> {
    await prisma.supplier.delete({
      where: { id },
    });
  },
};
