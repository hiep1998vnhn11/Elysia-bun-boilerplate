import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number

  @Column({
    type: 'varchar',
  })
  name: string

  @Column({
    type: 'varchar',
    nullable: true,
  })
  password: string | null

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
