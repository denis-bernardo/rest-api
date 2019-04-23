import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { CashFlowType } from './CashFlowType'
import { CashFlowCategory } from './CashFlowCategory'
import { Payment } from './Payment'
import { Register } from './Register';

@Entity()
export class CashFlow {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  public value: number

  @Column({
    type: 'varchar',
    length: 150
  })
  public description?: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(() => CashFlowType, (cashFlowType) => cashFlowType.cashFlows)
  @JoinColumn({ name: 'cash_flow_type_id' })
  public type: CashFlowType

  @ManyToOne(() => CashFlowCategory, (cashFlowCategory) => cashFlowCategory.cashFlows)
  @JoinColumn({ name: 'cash_flow_category_id' })
  public category: CashFlowCategory

  @ManyToOne(() => Payment, (payment) => payment.cashFlows)
  @JoinColumn({ name: 'payment_id' })
  public payment: Payment

  @ManyToOne(() => Register, (register) => register.cashFlows)
  @JoinColumn({ name: 'register_id' })
  public register: Register
}
