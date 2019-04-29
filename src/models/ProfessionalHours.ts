import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import Professional from './Professional'

@Entity()
export default class ProfessionalHours {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'int',
    name: 'week_day'
  })
  public weekDay: number

  @Column({
    type: 'time',
    name: 'start_at'
  })
  public startAt: string

  @Column({
    type: 'time',
    name: 'end_at'
  })
  public endAt: string

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date

  @ManyToOne(() => Professional, (professional) => professional.hours)
  @JoinColumn({ name: 'professional_id' })
  public professional: Professional
}
