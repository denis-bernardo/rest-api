import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class BusinessHasUser {
  @PrimaryGeneratedColumn('uuid', {
    name: 'business_id'
  })
  public businessId: string

  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id'
  })
  public userId: string

  @Column('boolean')
  public active?: boolean

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date
}
