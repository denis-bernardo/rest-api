import * as bcrypt from 'bcryptjs'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, BeforeInsert, ManyToMany } from 'typeorm'
import UserGroup from './UserGroup'
import Register from './Register'
import Business from './Business'

@Entity()
export default class User {
  @BeforeInsert()
  protected setPassword () {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }

  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column({
    type: 'varchar',
    length: 150
  })
  public email: string

  @Column({
    type: 'varchar',
    length: 255
  })
  public password: string

  @Column({
    type: 'varchar',
    length: 255
  })
  public image?: string

  @Column({
    type: 'datetime',
    name: 'deactivated_at'
  })
  public deactivatedAt?: Date

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
