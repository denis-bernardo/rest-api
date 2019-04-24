import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Business } from './Business'
import { User } from './User'
import { CashFlow } from './CashFlow'

@Entity()
export class Register {
  @PrimaryGeneratedColumn()
  public id: number

  @Column('datetime')
  public openedAt: Date

  @Column('datetime')
  public closedAt?: Date

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
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
