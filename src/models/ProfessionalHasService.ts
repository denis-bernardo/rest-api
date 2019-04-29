import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class ProfessionalHasService {
  @PrimaryGeneratedColumn('uuid', {
    name: 'professional_id'
  })
  public professionalId: string

  @PrimaryGeneratedColumn('uuid', {
    name: 'service_id'
  })
  public serviceId: string

  @CreateDateColumn({
    name: 'created_at'
  })
  public createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at'
  })
  public updatedAt: Date
}
