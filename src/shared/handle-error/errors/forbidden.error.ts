import { ApiError } from '../api-error';
import type { ParameterErrorType } from '../types/parameter-error.type';

export class ForbiddenError extends ApiError {
  constructor(params: ParameterErrorType) {
    super(params, 403, 'FORBIDDEN');
  }
}
