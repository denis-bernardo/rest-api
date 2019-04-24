import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Business } from './Business'
import { ServiceCategory } from './ServiceCategory'
import { OrderItem } from './OrderItem'
import { ServiceDetail } from './ServiceDetail'

@Entity()
export class Service {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    type: 'varchar',
    length: 100
  })
  public name: string

  @Column('boolean')
  public preset?: boolean

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(() => Business, (business) => business.services)
  @JoinColumn({ name: 'business_id' })
  public business: Business

  @ManyToOne(() => ServiceCategory, (serviceCategory) => serviceCategory.services)
  @JoinColumn({ name: 'service_category_id' })
  public categories: ServiceCategory

  @OneToMany(() => OrderItem, orderItem => orderItem.service)
  public orderItems: OrderItem[]

  @OneToMany(() => ServiceDetail, serviceDetail => serviceDetail.business)
  public serviceDetails: ServiceDetail[]
}
