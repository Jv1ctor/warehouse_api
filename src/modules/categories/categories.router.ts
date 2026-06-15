import { Router } from 'express';

import { categoriesController } from './categories.controller';
import { categoriesRepository } from './categories.repository';
import { categoriesService } from './categories.service';

export const categoriesRoutes = Router();

const service = categoriesService({ repository: categoriesRepository });
const controller = categoriesController(service);

categoriesRoutes.get('/', controller.findAll);
categoriesRoutes.get('/:id', controller.findById);
categoriesRoutes.post('/', controller.create);
categoriesRoutes.put('/:id', controller.update);
categoriesRoutes.delete('/:id', controller.delete);
