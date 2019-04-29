import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import Business from './Business'

@Entity()
export default class BusinessHours {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'int',
    name: 'week_day'
  })
  public weekDay: number

  @Column({
    type: 'time'
  })
  public open?: string

  @Column({
    type: 'time'
  })
  public closed?: string

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date

  @ManyToOne(() => Business, (business) => business.businessHours)
  @JoinColumn({ name: 'business_id' })
  public business: Business
}
