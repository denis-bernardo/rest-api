import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Business } from './Business'
import { Product } from './Product'

@Entity()
export class ProductBrand {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'varchar',
    length: 45
  })
  public name: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(() => Business, (business) => business.productBrands)
  @JoinColumn({ name: 'business_id' })
  public business: Business

  @OneToMany(() => Product, product => product.productBrand)
  public products: Product[]
}
