import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne, OneToMany, ManyToMany } from 'typeorm'
import Address from './Address'
import User from './User'
import Order from './Order'
import Schedule from './Schedule'
import Business from './Business'

@Entity()
export default class Customer {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    type: 'varchar',
    length: 100
  })
  public name: string

  @Column({
    type: 'varchar',
    length: 11,
    name: 'phone_number'
  })
  public phoneNumber?: string

  @Column({
    type: 'date',
    name: 'birth_date'
  })
  public birthDate?: Date

  @Column({
    type: 'varchar',
    length: 1
  })
  public gender?: string

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date

  @ManyToOne(() => Address, (address) => address.customers)
  @JoinColumn({ name: 'address_id' })
  public address?: Address

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  public user: User

  @OneToMany(() => Order, order => order.customer)
  public orders: Order[]

  @OneToMany(() => Schedule, schedule => schedule.customer)
  public schedules: Schedule[]

  @ManyToMany(() => Business, business => business.users)
  public businesses: Business[]
}
