import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import Business from './Business'
import Professional from './Professional'
import Customer from './Customer'
import ScheduleStatus from './ScheduleStatus'
import Order from './Order'
import Service from './Service'

@Entity()
export default class Schedule {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    type: 'date',
    name: 'scheduled_to'
  })
  public scheduledTo: Date

  @Column({
    type: 'int',
    name: 'week_day'
  })
  public weekDay: number

  @Column({
    type: 'time',
    name: 'start_at'
  })
  public startAt: string

  @Column({
    type: 'time',
    name: 'end_at'
  })
  public endAt: string

  @Column({
    type: 'varchar',
    length: 255
  })
  public note?: string

  @Column({
    type: 'datetime',
    name: 'confirmed_at'
  })
  public confirmedAt?: Date

  @Column({
    type: 'boolean'
  })
  public block?: boolean

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
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

  @OneToMany(() => Order, order => order.schedule, { cascade: true })
  public orders: Order[]

  @ManyToMany(() => Service, service => service.schedules, { cascade: true })
  @JoinTable({
    name: 'schedule_has_service',
    joinColumn: {
      name: 'schedule_id'
    },
    inverseJoinColumn: {
      name: 'service_id'
    }
  })
  public services: Service[]
}
