import type { ParameterErrorType } from './types/parameter-error.type';

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly codeError: string;

  constructor(
    params: ParameterErrorType,
    statusCode: number,
    codeError: string,
  ) {
    super(params.message);
    this.statusCode = statusCode;
    this.codeError = codeError;
  }
}
