import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import Business from './Business'
import Professional from './Professional'
import Customer from './Customer'
import ScheduleStatus from './ScheduleStatus'

@Entity()
export default class Schedule {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    type: 'date'
  })
  public scheduledTo: Date

  @Column({
    type: 'int'
  })
  public weekDay: number

  @Column({
    type: 'time'
  })
  public startAt: number

  @Column({
    type: 'time'
  })
  public endAt: number

  @Column({
    type: 'varchar',
    length: 255
  })
  public note?: string

  @Column({
    type: 'datetime'
  })
  public confirmedAt?: Date

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(() => Professional, (professional) => professional.schedules)
  @JoinColumn({ name: 'professional_id' })
  public professional: Professional

  @ManyToOne(() => Customer, (customer) => customer.schedules)
  @JoinColumn({ name: 'customer_id' })
  public customer: Customer

  @ManyToOne(() => Business, (business) => business.schedules)
  @JoinColumn({ name: 'business_id' })
  public business: Business

  @ManyToOne(() => ScheduleStatus, (scheduleStatus) => scheduleStatus.schedules)
  @JoinColumn({ name: 'schedule_status_id' })
  public status: ScheduleStatus
}
