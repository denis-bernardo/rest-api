import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'

@Entity()
export default class UserGroupHasUserResource {
  @PrimaryColumn({
    name: 'user_group_id'
  })
  public userGroupId: number

  @PrimaryColumn({
    name: 'user_resource_id'
  })
  public userResourceId: number

  @Column('boolean')
  public read?: boolean

  @Column('boolean')
  public write?: boolean

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date
}
