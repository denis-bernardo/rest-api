import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany } from 'typeorm'
import Business from './Business'
import ServiceCategory from './ServiceCategory'
import OrderItem from './OrderItem'
import ServiceDetail from './ServiceDetail'
import Professional from './Professional'
import Schedule from './Schedule'

@Entity()
export default class Service {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    type: 'varchar',
    length: 100
  })
  public name: string

  @Column('boolean')
  public preset?: boolean

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date

  @ManyToOne(() => Business, (business) => business.services)
  @JoinColumn({ name: 'business_id' })
  public business: Business

  @ManyToOne(() => ServiceCategory, (serviceCategory) => serviceCategory.services)
  @JoinColumn({ name: 'service_category_id' })
  public serviceCategory: ServiceCategory

  @OneToMany(() => OrderItem, orderItem => orderItem.service)
  public orderItems: OrderItem[]

  @OneToMany(() => ServiceDetail, serviceDetail => serviceDetail.service, { cascade: true })
  public serviceDetails: ServiceDetail[]

  @ManyToMany(() => Professional, professional => professional.services)
  public professionals: Professional[]

  @ManyToMany(() => Schedule, schedule => schedule.services)
  public schedules: Schedule[]
}
