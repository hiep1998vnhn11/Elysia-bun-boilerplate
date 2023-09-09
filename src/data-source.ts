import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: Bun.env.DB_USERNAME,
  password: Bun.env.DB_PASSWORD,
  database: 'elysia',
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
})
