import { Router } from 'express';

import { authRoutes } from './modules/auth/auth.router';
import { authMiddleware } from './modules/auth/middleware/auth.middleware';
import { userRepository } from './modules/auth/user.repository';
import { categoriesRoutes } from './modules/categories/categories.router';
import { productRoutes } from './modules/product/product.router';
import { stockMovementRoutes } from './modules/stock-movement/stock-movement.router';
import { supplierRoutes } from './modules/supplier/supplier.router';

export const router = Router();

const authenticator = authMiddleware({ repository: userRepository });

router.use('/auth', authenticator, authRoutes);
router.use('/categories', authenticator, categoriesRoutes);
router.use('/products', authenticator, productRoutes);
router.use('/stock-movements', authenticator, stockMovementRoutes);
router.use('/suppliers', authenticator, supplierRoutes);
