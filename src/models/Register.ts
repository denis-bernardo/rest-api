import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import Business from './Business'
import User from './User'
import CashFlow from './CashFlow'

@Entity()
export default class Register {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'datetime',
    name: 'opened_at'
  })
  public openedAt: Date

  @Column({
    type: 'datetime',
    name: 'closed_at'
  })
  public closedAt?: Date

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date

  @ManyToOne(() => User, (user) => user.registers)
  @JoinColumn({ name: 'user_id' })
  public user: User

  @ManyToOne(() => Business, (business) => business.registers)
  @JoinColumn({ name: 'business_id' })
  public business: Business

  @OneToMany(() => CashFlow, cashFlow => cashFlow.register)
  public cashFlows: CashFlow[]
}
