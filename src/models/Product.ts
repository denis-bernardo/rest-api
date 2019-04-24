import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Business } from './Business'
import { ProductBrand } from './ProductBrand'
import { ProductCategory } from './ProductCategory'
import { OrderItem } from './OrderItem'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'varchar',
    length: 100
  })
  public name: string

  @Column({
    type: 'varchar',
    length: 255
  })
  public description?: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  public price: number

  @Column({
    type: 'varchar',
    length: 255
  })
  public image?: string

  @Column({
    type: 'int'
  })
  public quantity: number

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(() => Business, (business) => business.products)
  @JoinColumn({ name: 'business_id' })
  public business: Business

  @ManyToOne(() => ProductBrand, (productBrand) => productBrand.products)
  @JoinColumn({ name: 'product_brand_id' })
  public productBrand: ProductBrand

  @ManyToOne(() => ProductCategory, (productCategory) => productCategory.products)
  @JoinColumn({ name: 'product_category_id' })
  public productCategory: ProductCategory

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  public orderItems: OrderItem[]
}
