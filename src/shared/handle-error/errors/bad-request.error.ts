import { ApiError } from '../api-error';
import type { ParameterErrorType } from '../types/parameter-error.type';

export class BadRequestError extends ApiError {
  constructor(params: ParameterErrorType) {
    super(params, 400, 'BAD_REQUEST');
  }
}
