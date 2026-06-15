import type { InputSupplierDto } from '../dtos/input-supplier.dto';
import type { SupplierDto } from '../dtos/supplier.dto';

export interface ISupplieService {
  listAll(): Promise<SupplierDto[]>;
  findById(id: number): Promise<SupplierDto | null>;
  create(input: InputSupplierDto): Promise<SupplierDto>;
  update(id: number, input: Partial<InputSupplierDto>): Promise<SupplierDto>;
  delete(id: number): Promise<void>;
}
