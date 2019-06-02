import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, BeforeInsert, ManyToMany } from 'typeorm'
import UserGroup from './UserGroup'
import Register from './Register'
import Business from './Business'

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    name: 'cognito_user_sub',
    type: 'varchar',
    length: 100
  })
  public cognitoUserSub: string

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date

  @ManyToOne(() => UserGroup, (userGroup) => userGroup.users)
  @JoinColumn({ name: 'user_group_id' })
  public userGroup: UserGroup

  @OneToMany(() => Register, register => register.user)
  public registers: Register[]

  @ManyToMany(() => Business, business => business.users)
  public businesses: Business[]
}
