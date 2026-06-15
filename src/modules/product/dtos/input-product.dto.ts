export type Unity = 'un' | 'kg' | 'L';

export type InputProductDto = {
  name: string;
  description?: string;
  unity: Unity;
  minimunStock?: number;
  categoryId: number;
  supplierId: number;
};
