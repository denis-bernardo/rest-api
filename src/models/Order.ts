import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { OrderStatus } from './OrderStatus'
import { Payment } from './Payment'
import { Professional } from './Professional'
import { Business } from './Business'
import { Customer } from './Customer'
import { OrderItem } from './OrderItem'

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'varchar',
    length: 255
  })
  public note?: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  public amount: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  public amountReceived?: number

  @Column('datetime')
  public paidAt?: Date

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.orders)
  @JoinColumn({ name: 'order_status_id' })
  public status: OrderStatus

  @ManyToOne(() => Payment, (payment) => payment.orders)
  @JoinColumn({ name: 'payment_id' })
  public payment: Payment

  @ManyToOne(() => Professional, (professional) => professional.orders)
  @JoinColumn({ name: 'professional_id' })
  public professional: Professional

  @ManyToOne(() => Business, (business) => business.orders)
  @JoinColumn({ name: 'business_id' })
  public business: Business

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  public customer: Customer

  @ManyToOne(() => Professional, (professional) => professional.orders)
  @JoinColumn({ name: 'cashier_id' })
  public cashier: Professional

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  public items: OrderItem[]
}
