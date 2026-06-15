import type { InputProductDto } from '../dtos/input-product.dto';
import type { ProductDto } from '../dtos/product.dto';

export interface IProductService {
  listAll(): Promise<ProductDto[]>;
  findById(id: number): Promise<ProductDto>;
  create(input: InputProductDto): Promise<ProductDto>;
  update(id: number, input: Partial<InputProductDto>): Promise<ProductDto>;
  delete(id: number): Promise<void>;
}
