import 'reflect-metadata'

import { Elysia } from 'elysia'
import { AppDataSource } from './data-source'

class Server {
  private readonly app: Elysia
  constructor() {
    this.app = new Elysia()
  }

  async initialize() {
    await AppDataSource.initialize()
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(
        `🦊 Elysia is running at ${this.app.server?.hostname}:${this.app.server?.port}`
      )
    })
  }

  static async listen(port: number) {
    const server = new Server()
    await server.initialize()
    server.listen(port)
  }
}

Server.listen(3000)

// Env
declare module 'bun' {
  export interface Env {
    readonly DB_PASSWORD: string
    readonly DB_USERNAME: string
  }
}
declare global {}
