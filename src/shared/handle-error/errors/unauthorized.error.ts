import { ApiError } from '../api-error';
import type { ParameterErrorType } from '../types/parameter-error.type';

export class UnauthorizedError extends ApiError {
  constructor(params: ParameterErrorType) {
    super(params, 401, 'UNAUTHORIZED');
  }
}
