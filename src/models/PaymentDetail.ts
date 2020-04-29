import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import Business from './Business'
import Payment from './Payment'

@Entity()
export default class PaymentDetail {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  public tax?: number

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date

  @ManyToOne(() => Payment, (payment) => payment.paymentDetails)
  @JoinColumn({ name: 'payment_id' })
  public payment: Payment

  @ManyToOne(() => Business, (business) => business.paymentDetails)
  @JoinColumn({ name: 'business_id' })
  public business: Business
}
