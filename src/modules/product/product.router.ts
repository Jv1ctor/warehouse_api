import { Router } from 'express';

import { categoriesRepository } from '../categories/categories.repository';
import { stockMovementRepository } from '../stock-movement/stock-movement.repository';
import { supplierRepository } from '../supplier/supplier.repository';
import { productController } from './product.controller';
import { productRepository } from './product.repository';
import { productService } from './product.service';

export const productRoutes = Router();

const service = productService({
  productRepo: productRepository,
  categoryRepo: categoriesRepository,
  supplierRepo: supplierRepository,
  smRepo: stockMovementRepository,
});
const controller = productController(service);

productRoutes.get('/', controller.findAll);
productRoutes.get('/:id', controller.findById);
productRoutes.post('/', controller.create);
productRoutes.put('/:id', controller.update);
productRoutes.delete('/:id', controller.delete);
