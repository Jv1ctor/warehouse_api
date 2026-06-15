import { Router } from 'express';

import { authController } from './auth.controller';
import { authService } from './auth.service';
import { userRepository } from './user.repository';

export const authRoutes = Router();

const service = authService({ repository: userRepository });
const controller = authController(service);

authRoutes.post('/register', controller.register);
authRoutes.post('/login', controller.login);
