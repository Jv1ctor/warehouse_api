export type ProductDto = {
  id: number;
  name: string;
  description: string | null;
  unity: string;
  currentStock: number;
  minimunStock: number;
  categoryId: number;
  supplierId: number;
  createdAt: Date;
};
