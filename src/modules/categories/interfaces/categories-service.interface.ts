import type { CategoryDto } from '../dtos/category.dto';
import type { InputCategoryDto } from '../dtos/input-category.dto';

export interface ICategoriesService {
  listAll(): Promise<CategoryDto[]>;
  findById(id: number): Promise<CategoryDto>;
  create(input: InputCategoryDto): Promise<CategoryDto>;
  update(id: number, input: Partial<InputCategoryDto>): Promise<CategoryDto>;
  delete(id: number): Promise<void>;
}
