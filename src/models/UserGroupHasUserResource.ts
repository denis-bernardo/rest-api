import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class UserGroupHasUserResource {
  @PrimaryGeneratedColumn()
  public userGroupId: number

  @PrimaryGeneratedColumn()
  public userResourceId: number

  @Column('boolean')
  public read?: boolean

  @Column('boolean')
  public write?: boolean

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date
}
