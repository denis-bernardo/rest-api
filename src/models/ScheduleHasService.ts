import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export default class ScheduleHasService {
  @PrimaryGeneratedColumn('uuid', {
    name: 'schedule_id'
  })
  public scheduleId: string

  @PrimaryGeneratedColumn('uuid', {
    name: 'service_id'
  })
  public serviceId: string

  @Column({
    type: 'int'
  })
  public duration?: number
}
