import { ApiError } from '../api-error';
import type { ParameterErrorType } from '../types/parameter-error.type';

export class NotFoundError extends ApiError {
  constructor(params: ParameterErrorType) {
    super(params, 404, 'NOT_FOUND');
  }
}
