import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Customer } from './Customer'

@Entity()
export class Address {
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
    length: 8
  })
  public zipCode?: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @OneToMany(() => Customer, customer => customer.address)
  public customers: Customer[]
}
