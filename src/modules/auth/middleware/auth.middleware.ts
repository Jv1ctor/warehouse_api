import type { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '@/shared/handle-error/errors/unauthorized.error';
import { verifyJwt } from '@/shared/jwt';

import type { IUserRepository } from '../interface/user-repository.interface';

export const authMiddleware =
  (deps: { repository: IUserRepository }) =>
  async (request: Request, _response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError({ message: 'Token Não informado' });
    }

    const [authCode, token] = authHeader.split(' ');

    if (authCode !== 'Bearer' || !token) {
      throw new UnauthorizedError({ message: 'Token Inválido' });
    }

    let decoded;
    try {
      decoded = verifyJwt<{ name: string; userId: number }>(token);
    } catch {
      throw new UnauthorizedError({
        message: 'Token Inválido',
      });
    }

    const user = await deps.repository.findById(decoded.userId);

    if (!user) {
      throw new UnauthorizedError({ message: 'Token Inválido' });
    }

    request.user = {
      id: user.id,
      name: user.name,
    };

    next();
  };
