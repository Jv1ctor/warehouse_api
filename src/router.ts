import { Router } from 'express';

import { authRoutes } from './modules/auth/auth.router';
import { categoriesRoutes } from './modules/categories/categories.router';
import { productRoutes } from './modules/product/product.router';
import { stockMovementRoutes } from './modules/stock-movement/stock-movement.router';
import { supplierRoutes } from './modules/supplier/supplier.router';

export const router = Router();

router.use('/auth', authRoutes);
router.use('/categories', categoriesRoutes);
router.use('/products', productRoutes);
router.use('/stock-movements', stockMovementRoutes);
router.use('/suppliers', supplierRoutes);
