import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class BusinessHasUser {
  @PrimaryGeneratedColumn('uuid')
  public businessId: string

  @PrimaryGeneratedColumn('uuid')
  public userId: string

  @Column('boolean')
  public active?: boolean

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date
}
