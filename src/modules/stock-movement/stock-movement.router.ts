import { Router } from 'express';

import { productRepository } from '../product/product.repository';
import { stockMovementController } from './stock-movement.controller';
import { stockMovementRepository } from './stock-movement.repository';
import { stockMovementService } from './stock-movement.service';

export const stockMovementRoutes = Router();

const service = stockMovementService({
  smRepo: stockMovementRepository,
  productRepo: productRepository,
});
const controller = stockMovementController(service);

stockMovementRoutes.get('/', controller.findAll);
stockMovementRoutes.get('/:id', controller.findById);
stockMovementRoutes.get('/product/:productId', controller.findByProductId);
stockMovementRoutes.post('/', controller.create);
