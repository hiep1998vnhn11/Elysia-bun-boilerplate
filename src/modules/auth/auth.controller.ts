import Elysia, { Context } from 'elysia'
import { AppContext } from '../..'

export class AuthController {
  constructor(private readonly app: Elysia<'/auth'>) {
    this.app.get('/me', this.me.bind(this))
  }

  async me({ jwt, store: { userRepository } }: AppContext) {
    const user = await userRepository.findOneByOrFail({ id: 1 })
    const { password, ...rest } = user
    const token = await jwt.sign(rest)
    return {
      access_token: token,
    }
  }
}
