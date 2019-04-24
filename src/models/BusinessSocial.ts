import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { Business } from './Business'

@Entity()
export class BusinessSocial {
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

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @OneToOne(() => Business)
  @JoinColumn({ name: 'business_id' })
  public business: Business;
}
