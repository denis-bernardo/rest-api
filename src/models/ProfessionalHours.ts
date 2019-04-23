import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Professional } from './Professional'

@Entity()
export class ProfessionalHours {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    type: 'int',
    length: 1
  })
  public weekDay: number

  @Column({
    type: 'time'
  })
  public startAt: number

  @Column({
    type: 'time'
  })
  public endAt: number

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @ManyToOne(() => Professional, (professional) => professional.hours)
  @JoinColumn({ name: 'professional_id' })
  public professional: Professional
}
