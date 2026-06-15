import type { Unity } from '@/modules/product/dtos/input-product.dto';

const validUnity = new Set<Unity>(['un', 'kg', 'L']);
export const validateUnity = (unity: string): boolean => {
  return validUnity.has(unity as Unity);
};
