import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class BusinessHasCustomer {
  @PrimaryGeneratedColumn('uuid')
  public businessId: string

  @PrimaryGeneratedColumn('uuid')
  public customerId: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date
}
