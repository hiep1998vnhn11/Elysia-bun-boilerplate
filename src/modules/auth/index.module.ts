import Elysia from 'elysia'
import type { App } from '../..'
import { AuthController } from './auth.controller'

export class AuthModule {
  readonly app
  constructor(app: Elysia<'/api'>) {
    this.app = new Elysia({ prefix: '/auth' })

    new AuthController(this.app)

    app.use(this.app)
  }
}
