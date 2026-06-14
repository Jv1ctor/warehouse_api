import type { NextFunction, Request, Response } from 'express';

import { logger } from '@/shared/logger';

import { ApiError } from '../api-error';

export const globalErrorMiddleware = (
  error: unknown,
  _request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (error instanceof ApiError) {
    response.status(error.statusCode).json({
      error: error.message,
    });
    return;
  }

  logger.error((error as Error).message);

  response.status(500).json({
    error: 'Internal Server Error',
  });
};
