import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { BusinessType } from './BusinessType'
import { Address } from './Address'
import { Plan } from './Plan'
import { BusinessHours } from './BusinessHours'
import { UserGroup } from './UserGroup'
import { Professional } from './Professional'
import { ServiceCategory } from './ServiceCategory'
import { Service } from './Service'
import { ProductBrand } from './ProductBrand'
import { ProductCategory } from './ProductCategory'
import { Product } from './Product'
import { Payment } from './Payment'
import { Order } from './Order'
import { Register } from './Register'
import { Schedule } from './Schedule'
import { ServiceDetail } from './ServiceDetail'
import { PaymentDetail } from './PaymentDetail'

@Entity()
export class Business {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    type: 'varchar',
    length: 255
  })
  public name: string

  @Column({
    type: 'varchar',
    length: 255
  })
  public companyName?: string

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

  @Column({
    type: 'varchar',
    length: 100
  })
  public email?: string

  @Column({
    type: 'varchar',
    length: 255
  })
  public image?: string

  @Column({
    type: 'varchar',
    length: 45
  })
  public ie?: string

  @Column({
    type: 'text'
  })
  public description?: string

  @Column({
    type: 'datetime'
  })
  public deactivatedAt?: Date

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @OneToOne(() => BusinessType)
  @JoinColumn({ name: 'business_type_id' })
  public businessType: BusinessType

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  public address: Address

  @OneToOne(() => Plan)
  @JoinColumn({ name: 'plan_id' })
  public plan: Plan

  @OneToMany(() => BusinessHours, businessHours => businessHours.business)
  public businessHours: BusinessHours[]

  @OneToMany(() => UserGroup, userGroup => userGroup.business)
  public userGroups: UserGroup[]

  @OneToMany(() => Professional, professional => professional.business)
  public professionals: Professional[]

  @OneToMany(() => ServiceCategory, serviceCategory => serviceCategory.business)
  public serviceCategories: ServiceCategory[]

  @OneToMany(() => Service, service => service.business)
  public services: Service[]

  @OneToMany(() => ProductBrand, productBrand => productBrand.business)
  public productBrands: ProductBrand[]

  @OneToMany(() => ProductCategory, productCategory => productCategory.business)
  public productCategories: ProductCategory[]

  @OneToMany(() => Product, product => product.business)
  public products: Product[]

  @OneToMany(() => Payment, payment => payment.business)
  public payments: Payment[]

  @OneToMany(() => Order, order => order.business)
  public orders: Order[]

  @OneToMany(() => Register, register => register.business)
  public registers: Register[]

  @OneToMany(() => Schedule, schedule => schedule.business)
  public schedules: Schedule[]

  @OneToMany(() => ServiceDetail, serviceDetail => serviceDetail.business)
  public serviceDetails: ServiceDetail[]

  @OneToMany(() => PaymentDetail, paymentDetail => paymentDetail.business)
  public paymentDetails: PaymentDetail[]
}
