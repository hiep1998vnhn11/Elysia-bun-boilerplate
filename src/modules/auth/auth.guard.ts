import { AppContext } from '../..'
import { UnauthorizedError } from '../../exception/unauthorized.error'

export async function authGuard({ set, headers, jwt, request }: AppContext) {
  const token = headers.authorization?.split(' ')[1]
  const user = token ? await jwt.verify(token) : null
  if (user) {
    // request.user = user
  } else {
    set.status = 401
    return 'Unauthorized'
    //   return new Response('Unauthorized')
  }
}
