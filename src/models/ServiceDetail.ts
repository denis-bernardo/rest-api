import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import Business from './Business'
import Service from './Service'

@Entity()
export default class ServiceDetail {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  public price: number

  @Column('time')
  public duration: number

  @Column('boolean')
  public scheduling?: boolean

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(() => Service, (service) => service.serviceDetails)
  @JoinColumn({ name: 'service_id' })
  public service: Service

  @ManyToOne(() => Business, (business) => business.serviceDetails)
  @JoinColumn({ name: 'business_id' })
  public business: Business
}
