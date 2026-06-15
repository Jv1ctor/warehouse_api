import { Router } from 'express';

import { supplierController } from './supplier.controller';
import { supplierRepository } from './supplier.repository';
import { supplierService } from './supplier.service';

export const supplierRoutes = Router();

const service = supplierService({ repository: supplierRepository });
const controller = supplierController(service);

supplierRoutes.get('/', controller.findAll);
supplierRoutes.get('/:id', controller.findById);
supplierRoutes.post('/', controller.create);
supplierRoutes.put('/:id', controller.update);
supplierRoutes.delete('/:id', controller.delete);
