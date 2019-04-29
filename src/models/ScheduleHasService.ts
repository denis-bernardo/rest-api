import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export default class ScheduleHasService {
  @PrimaryGeneratedColumn('uuid')
  public scheduleId: string

  @PrimaryGeneratedColumn('uuid')
  public serviceId: string

  @Column({
    type: 'int'
  })
  public duration?: number
}
