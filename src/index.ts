import 'reflect-metadata'

import { Elysia, Context, UnwrapSchema } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { staticPlugin } from '@elysiajs/static'
import { jwt } from '@elysiajs/jwt'
import { cors } from '@elysiajs/cors'

import { AppDataSource } from './data-source'
import setup from './setup'
import { AuthModule } from './modules/auth/index.module'

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Swagger',
          version: '1.0.0',
        },
      },
    })
  )
  .use(
    jwt({
      name: 'jwt',
      secret: Bun.env.JWT_SECRET ?? 'asasd',
      exp: '2h',
    })
  )
  .use(
    staticPlugin({
      prefix: '/',
    })
  )
  .use(setup)
  .group('/api', (app) => {
    app.get('/', ({ jwt }) => {})
    new AuthModule(app)
    return app
  })

export type App = typeof app
export interface AppContext extends Context {
  store: typeof app.store
  jwt: {
    readonly sign: (morePayload: any) => Promise<string>
    readonly verify: (jwt?: string) => Promise<false | any>
  }
}

async function initialize() {
  await AppDataSource.initialize()

  app.listen(+Bun.env.PORT, () => {
    console.log(
      `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    )
  })
}

initialize()
// Env
declare module 'bun' {
  export interface Env {
    readonly DB_PASSWORD: string
    readonly DB_USERNAME: string
    readonly PORT: number
    readonly DB_DATABASE: string
    readonly JWT_SECRET: string
  }
}
declare global {}
