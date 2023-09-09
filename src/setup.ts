import Elysia from 'elysia'
import { AppDataSource } from './data-source'
import { User } from './entities/user.entity'

const setup = new Elysia({
  name: 'setup',
}).state('userRepository', AppDataSource.getRepository(User))

export default setup
