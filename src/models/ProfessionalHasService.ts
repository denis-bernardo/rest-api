import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class ProfessionalHasService {
  @PrimaryGeneratedColumn('uuid')
  public professionalId: string

  @PrimaryGeneratedColumn('uuid')
  public serviceId: string

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date
}
