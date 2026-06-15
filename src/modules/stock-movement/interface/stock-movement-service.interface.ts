import type { InputStockMovementDto } from '../dtos/input-stock-movement.dto';
import type { StockMovementDto } from '../dtos/stock-movement.dto';

export interface IStockMovementService {
  listAll(): Promise<StockMovementDto[]>;
  findByid(id: number): Promise<StockMovementDto>;
  ListAllByProduct(productId: number): Promise<StockMovementDto[]>;
  create(input: InputStockMovementDto): Promise<StockMovementDto>;
}
