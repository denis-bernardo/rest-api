import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Business } from './Business'

@Entity()
export class BusinessHours {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'int',
    length: 1
  })
  public weekDay: number

  @Column({
    type: 'time'
  })
  public open?: number

  @Column({
    type: 'time'
  })
  public closed?: number

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(() => Business, (business) => business.businessHours)
  @JoinColumn({ name: 'business_id' })
  public business: Business
}
