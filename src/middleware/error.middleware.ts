import { ErrorHandler } from 'elysia'
import type { ICustomError } from '../exception/type'

// @ts-ignore
export const errorMiddleware: ErrorHandler<ICustomError> = ({
  error,
  request,
  code,
  set,
}) => {
  if (code === 'UNAUTHORIZED') {
    set.status = 401
    return new Response('Unauthorized')
  }
  if (code === 'VALIDATION') {
    set.status = 422
    console.log(error.all)
    // Find a specific error name (path is OpenAPI Schema compliance)
    const name = error.all.find((x) => x.path === '/name')
    // If has validation error, then log it
    if (name) console.log(name)
  }
  return new Response(error.toString())
}
