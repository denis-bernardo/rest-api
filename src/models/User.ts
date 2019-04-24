import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { UserGroup } from './UserGroup'
import { Register } from './Register'

@Entity()
export class User {
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
    type: 'datetime'
  })
  public deactivatedAt?: Date

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(() => UserGroup, (userGroup) => userGroup.users)
  @JoinColumn({ name: 'user_group_id' })
  public userGroups: UserGroup

  @OneToMany(() => Register, register => register.user)
  public registers: Register[]
}
