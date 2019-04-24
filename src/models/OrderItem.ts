import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Order } from './Order'
import { Product } from './Product'
import { Service } from './Service'

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'varchar',
    length: 150
  })
  public name: string

  @Column({
    type: 'int'
  })
  public quantity: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  public price: number

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  public discount?: number

  @Column('boolean')
  public isTip?: boolean

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  public order: Order

  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn({ name: 'product_id' })
  public product: Product

  @ManyToOne(() => Service, (service) => service.orderItems)
  @JoinColumn({ name: 'service_id' })
  public service: Service
}
