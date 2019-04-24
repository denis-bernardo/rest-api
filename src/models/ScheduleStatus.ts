import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Schedule } from './Schedule'

@Entity()
export class ScheduleStatus {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'varchar',
    length: 45
  })
  public name: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @OneToMany(() => Schedule, schedule => schedule.status)
  public schedules: Schedule[]
}
