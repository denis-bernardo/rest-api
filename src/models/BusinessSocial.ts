import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import Business from './Business'

@Entity()
export default class BusinessSocial {
  @PrimaryGeneratedColumn()
  public id: number

  @Column('varchar')
  public website?: string

  @Column('varchar')
  public instagram?: string

  @Column('varchar')
  public facebook?: string

  @Column('varchar')
  public twitter?: string

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date

  @OneToOne(() => Business)
  @JoinColumn({ name: 'business_id' })
  public business: Business;
}
