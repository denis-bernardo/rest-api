import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import Customer from './Customer'
import Business from './Business'

@Entity()
export default class Address {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'varchar',
    length: 150
  })
  public street?: string

  @Column({
    type: 'varchar',
    length: 10
  })
  public number?: string

  @Column({
    type: 'varchar',
    length: 100
  })
  public neighborhood?: string

  @Column({
    type: 'varchar',
    length: 100
  })
  public complement?: string

  @Column({
    type: 'varchar',
    length: 100
  })
  public city?: string

  @Column({
    type: 'varchar',
    length: 2
  })
  public state?: string

  @Column({
    type: 'varchar',
    length: 100
  })
  public country?: string

  @Column({
    type: 'varchar',
    length: 8,
    name: 'zip_code'
  })
  public zipCode?: string

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date

  @OneToMany(() => Customer, customer => customer.address)
  public customers: Customer[]

  @OneToMany(() => Business, business => business.address)
  public businesses: Business[]
}
