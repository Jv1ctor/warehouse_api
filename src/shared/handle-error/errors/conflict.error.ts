import { ApiError } from '../api-error';
import type { ParameterErrorType } from '../types/parameter-error.type';

export class ConflictError extends ApiError {
  constructor(params: ParameterErrorType) {
    super(params, 409, 'CONFLICT');
  }
}
