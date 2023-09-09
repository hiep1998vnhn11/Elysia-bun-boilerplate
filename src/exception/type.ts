import type { UnauthorizedError } from './unauthorized.error'

export enum ErrorCodeEnum {
  UNAUTHORIZED = 'UNAUTHORIZED',
}
export interface ICustomError extends Record<ErrorCodeEnum, Error> {
  [ErrorCodeEnum.UNAUTHORIZED]: UnauthorizedError
}
