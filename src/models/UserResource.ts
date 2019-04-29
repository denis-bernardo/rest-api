import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class UserResource {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'varchar',
    length: 100
  })
  public name: string

  @Column({
    type: 'varchar',
    length: 100
  })
  public uri: string

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date
}
