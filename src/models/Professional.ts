import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import User from './User'
import Business from './Business'
import ProfessionalHours from './ProfessionalHours'
import Order from './Order'
import Schedule from './Schedule'
import Service from './Service'

@Entity()
export default class Professional {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    type: 'varchar',
    length: 100
  })
  public name: string

  @Column({
    type: 'varchar',
    length: 45
  })
  public nickname?: string

  @Column({
    type: 'varchar',
    length: 1
  })
  public gender?: string

  @Column({
    type: 'date',
    name: 'birth_date'
  })
  public birthDate?: Date

  @Column({
    type: 'varchar',
    length: 11
  })
  public document?: string

  @Column({
    type: 'varchar',
    length: 11,
    name: 'phone_number'
  })
  public phoneNumber?: string

  @Column({
    type: 'varchar',
    length: 11,
    name: 'landline_number'
  })
  public landlineNumber?: string

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ManyToOne(() => Business, (business) => business.professionals)
  @JoinColumn({ name: 'business_id' })
  public business: Business

  @OneToMany(() => ProfessionalHours, professionalHours => professionalHours.professional)
  public hours: ProfessionalHours[]

  @OneToMany(() => Order, order => order.professional)
  public orders: Order[]

  @OneToMany(() => Schedule, schedule => schedule.professional)
  public schedules: Schedule[]

  @ManyToMany(() => Service, service => service.professionals)
  @JoinTable({
    name: 'professional_has_service',
    joinColumn: {
      name: 'professional_id'
    },
    inverseJoinColumn: {
      name: 'service_id'
    }
  })
  public services: Service[]
}
