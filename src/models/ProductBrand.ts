import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import Business from './Business'
import Product from './Product'

@Entity()
export default class ProductBrand {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'varchar',
    length: 45
  })
  public name: string

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date

  @ManyToOne(() => Business, (business) => business.productBrands)
  @JoinColumn({ name: 'business_id' })
  public business: Business

  @OneToMany(() => Product, product => product.productBrand)
  public products: Product[]
}
