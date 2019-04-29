import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import Business from './Business'

@Entity()
export default class BusinessInfo {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'boolean',
    name: 'accept_credit_card'
  })
  public acceptCreditCard?: boolean

  @Column({
    type: 'boolean',
    name: 'accept_debit_card'
  })
  public acceptDebitCard?: boolean

  @Column({
    type: 'boolean',
    name: 'has_parking'
  })
  public hasParking?: boolean

  @Column({
    type: 'boolean',
    name: 'has_wifi'
  })
  public hasWifi?: boolean

  @Column('boolean')
  public accessbility?: boolean

  @Column({
    type: 'boolean',
    name: 'support_children'
  })
  public supportChildren?: boolean

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date

  @OneToOne(() => Business)
  @JoinColumn({ name: 'business_id' })
  public business: Business;
}
