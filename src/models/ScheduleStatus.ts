import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import Schedule from './Schedule'

@Entity()
export default class ScheduleStatus {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'varchar',
    length: 45
  })
  public name: string

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date

  @OneToMany(() => Schedule, schedule => schedule.status)
  public schedules: Schedule[]
}
