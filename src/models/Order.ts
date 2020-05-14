import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import OrderStatus from './OrderStatus'
import Payment from './Payment'
import Professional from './Professional'
import Business from './Business'
import Customer from './Customer'
import OrderItem from './OrderItem'
import Schedule from './Schedule'

@Entity()
export default class Order {
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
    scale: 2,
    name: 'amount_received'
  })
  public amountReceived?: number

  @Column({
    type: 'datetime',
    name: 'paid_at'
  })
  public paidAt?: Date

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
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

  @ManyToOne(() => Schedule, (schedule) => schedule.orders)
  @JoinColumn({ name: 'schedule_id' })
  public schedule: Schedule

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  public items: OrderItem[]
}
