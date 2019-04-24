import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { Business } from './Business'

@Entity()
export class BusinessInfo {
  @PrimaryGeneratedColumn()
  public id: number

  @Column('boolean')
  public acceptCreditCard?: boolean

  @Column('boolean')
  public acceptDebitCard?: boolean

  @Column('boolean')
  public hasParking?: boolean

  @Column('boolean')
  public hasWifi?: boolean

  @Column('boolean')
  public accessbility?: boolean

  @Column('boolean')
  public supportChildren?: boolean

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @OneToOne(() => Business)
  @JoinColumn({ name: 'business_id' })
  public business: Business;
}
