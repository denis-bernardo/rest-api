import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import Business from './Business'
import Order from './Order'
import CashFlow from './CashFlow'
import PaymentDetail from './PaymentDetail'

@Entity()
export default class Payment {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'varchar',
    length: 100
  })
  public name: string

  @Column('boolean')
  public preset?: boolean

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date

  @ManyToOne(() => Business, (business) => business.payments)
  @JoinColumn({ name: 'business_id' })
  public business: Business

  @OneToMany(() => Order, order => order.status)
  public orders: Order[]

  @OneToMany(() => CashFlow, cashFlow => cashFlow.payment)
  public cashFlows: CashFlow[]

  @OneToMany(() => PaymentDetail, paymentDetail => paymentDetail.payment)
  public paymentDetails: PaymentDetail[]
}
