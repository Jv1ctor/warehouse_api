import { type Request, type Response } from 'express';

import { BadRequestError } from '@/shared/handle-error/errors/bad-request.error';

import type { InputLoginDto } from './dtos/input-login.dto';
import type { InputRegisterDto } from './dtos/input-register.dto';
import type { IAuthService } from './interface/auth-service.interface';

export const authController = (service: IAuthService) => ({
  async register(request: Request, response: Response) {
    const { name, email, password } = request.body as Partial<InputRegisterDto>;

    if (!name || !email || !password) {
      throw new BadRequestError({ message: 'Dados invalidos' });
    }

    const user = await service.register({ name, email, password });

    response.status(201).json({
      data: user,
    });
  },

  async login(request: Request, response: Response) {
    const { email, password } = request.body as Partial<InputLoginDto>;

    if (!email || !password) {
      throw new BadRequestError({ message: 'Dados invalidos' });
    }

    const token = await service.login({ email, password });

    response.status(200).json({
      data: token,
    });
  },
});
