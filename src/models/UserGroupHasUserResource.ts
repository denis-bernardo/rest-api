import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'

@Entity()
export default class UserGroupHasUserResource {
  @PrimaryColumn()
  public userGroupId: number

  @PrimaryColumn()
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
