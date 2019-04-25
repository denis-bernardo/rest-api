import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import User from './User'
import Business from './Business'
import ProfessionalHours from './ProfessionalHours'
import Order from './Order'
import Schedule from './Schedule'

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
    type: 'date'
  })
  public birthDate?: Date

  @Column({
    type: 'varchar',
    length: 11
  })
  public document?: string

  @Column({
    type: 'varchar',
    length: 11
  })
  public phoneNumber?: string

  @Column({
    type: 'varchar',
    length: 11
  })
  public landlineNumber?: string

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
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
}
