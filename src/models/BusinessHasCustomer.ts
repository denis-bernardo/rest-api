import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class BusinessHasCustomer {
  @PrimaryGeneratedColumn('uuid', {
    name: 'business_id'
  })
  public businessId: string

  @PrimaryGeneratedColumn('uuid', {
    name: 'customer_id'
  })
  public customerId: string

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date
}
