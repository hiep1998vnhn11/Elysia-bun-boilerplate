import { AppContext } from './../../index'
import Elysia, { Context } from 'elysia'
import { authGuard } from './auth.guard'

export class AuthController {
  constructor(private readonly app: Elysia<'/auth'>) {
    this.app.post('/login', this.login.bind(this))
    this.app.get('/me', this.me.bind(this), {
      beforeHandle: async ({ jwt, set, request }) => {
        const token = request.headers.get('authorization')?.split(' ')[1]
        const user = token ? await jwt.verify(token) : null
        if (!user) {
          set.status = 401
          return 'Unauthorized'
        }
        request.user = user
      },
    })
  }

  async login({ jwt, store: { userRepository } }: AppContext) {
    const user = await userRepository.findOneByOrFail({ id: 1 })
    const { password, ...rest } = user
    const token = await jwt.sign(rest)
    return {
      access_token: token,
      token_type: 'Bearer',
      expires_in: 7 * 24 * 60 * 60 * 1000, // 7days
    }
  }

  async me({ jwt, request: { user }, store: { userRepository } }: AppContext) {
    return {
      user,
    }
  }
}
