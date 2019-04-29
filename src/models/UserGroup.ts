import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import Business from './Business'
import User from './User'
import UserResource from './UserResource'

@Entity()
export default class UserGroup {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'varchar',
    length: 100
  })
  public name: string

  @Column('boolean')
  public preset?: boolean

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date

  @ManyToOne(() => Business, (business) => business.userGroups)
  @JoinColumn({ name: 'business_id' })
  public business: Business

  @OneToMany(() => User, user => user.userGroup)
  public users: User[]

  @ManyToMany(() => UserResource)
  @JoinTable({
    name: 'user_group_has_user_resource',
    joinColumn: {
      name: 'user_group',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_resource',
      referencedColumnName: 'id'
    }
  })
  public userResources: UserResource[];
}
