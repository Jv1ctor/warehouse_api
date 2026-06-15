export type SupplierDto = {
  name: string;
  id: number;
  cnpj: string;
  email?: string | null;
  phone?: string | null;
  createdAt: Date;
};
