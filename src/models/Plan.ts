import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'varchar',
    length: 100
  })
  public name: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  public price: number

  @Column({
    type: 'varchar',
    length: 45
  })
  public externalId?: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date
}
