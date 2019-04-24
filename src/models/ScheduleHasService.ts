import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class ScheduleHasService {
  @PrimaryGeneratedColumn('uuid')
  public scheduleId: string

  @PrimaryGeneratedColumn('uuid')
  public serviceId: string

  @Column('time')
  public duration?: number
}
