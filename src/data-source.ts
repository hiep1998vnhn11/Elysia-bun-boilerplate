import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

import { User } from './entities/user.entity'

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: Bun.env.DB_USERNAME,
  password: Bun.env.DB_PASSWORD,
  database: Bun.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
  namingStrategy: new SnakeNamingStrategy(),
})
