import { getManager, EntityManager } from 'typeorm'
import NotFoundException from '../exceptions/NotFoundException'
import Business from '../models/Business'
import UserGroup from '../models/UserGroup'
import User from '../models/User'
import Professional from '../models/Professional'
import ProfessionalHours from '../models/ProfessionalHours'
import ProfessionalHasService from '../models/ProfessionalHasService'
import BusinessHasUser from '../models/BusinessHasUser'
import ConflictException from '../exceptions/ConflictException'
import { IProfessionalOptions } from '../interfaces/IProfessionalOptions'

export default class ProfessionalService {
  private transactionalEntityManager: EntityManager
  private data: IProfessionalOptions
  private business: Business;
  private user: User;
  private professional: Professional;
  private id: string;

  public constructor (business: Business) {
    this.business = business
  }

  public async create (data: IProfessionalOptions) {
    this.data = data
    await getManager().transaction(async transactionalEntityManager => {
      this.transactionalEntityManager = transactionalEntityManager
      await this.createUser()
      await this.saveProfessional()
      await Promise.all([this.attachServices(), this.saveHours()])
    })

    return this.professional
  }

  public async update (id: string, data: IProfessionalOptions) {
    this.id = id
    this.data = data
    await getManager().transaction(async transactionalEntityManager => {
      this.transactionalEntityManager = transactionalEntityManager
      await this.retriveProfessional()
      await this.saveProfessional(true)
      await Promise.all([this.attachServices(), this.saveHours()])
    })

    return this.professional
  }

  private async createUser () {
    const { userGroupId, cognitoUserSub } = this.data.user
    const userGroup = await this.transactionalEntityManager.findOne(UserGroup, userGroupId)

    if (!userGroup) {
      throw new NotFoundException('userGroup não encontrado')
    }

    const userAlreadyExists = await this.transactionalEntityManager.findOne(User, { where: { cognitoUserSub } })

    if (userAlreadyExists) throw new ConflictException(`Usuário já cadastrado: ${cognitoUserSub}`)

    const user = this.transactionalEntityManager.create(User, {
      cognitoUserSub,
      userGroup
    })

    await this.transactionalEntityManager.save(user)

    const businessHasUser = this.transactionalEntityManager.create(BusinessHasUser, {
      businessId: this.business.id,
      userId: user.id,
      active: true
    })

    await this.transactionalEntityManager.save(businessHasUser)

    this.user = user
  }

  private async saveProfessional (isUpdate = false) {
    const { ...professionalData } = this.data

    const plainObject = {
      name: professionalData.name,
      nickname: professionalData.nickname,
      gender: professionalData.gender,
      birthDate: professionalData.birthDate,
      document: professionalData.document,
      phoneNumber: professionalData.phoneNumber,
      landlineNumber: professionalData.landlineNumber,
      user: this.user,
      business: this.business
    }

    if (isUpdate) {
      delete plainObject.user
      delete plainObject.business

      Object.assign(plainObject, { id: this.professional.id })
    }

    const professional = this.transactionalEntityManager.create(Professional, plainObject)

    await this.transactionalEntityManager.save(professional)

    this.professional = professional
  }

  private async retriveProfessional () {
    const professional = await this.transactionalEntityManager.findOne(Professional, {
      where: { id: this.id, business: this.business }
    })

    if (!professional) {
      throw new NotFoundException('Profissional não encontrado')
    }

    this.professional = professional
  }

  private async attachServices () {
    const { services } = this.data

    if (!services || !services.length) {
      return
    }

    const attachedServices = await this.transactionalEntityManager.find(ProfessionalHasService, {
      where: { professionalId: this.professional.id }
    })

    await this.transactionalEntityManager.remove(attachedServices)

    return Promise.all(services.map((serviceId) => {
      const professionalHasService = this.transactionalEntityManager.create(ProfessionalHasService, {
        professionalId: this.professional.id,
        serviceId
      })

      return this.transactionalEntityManager.save(professionalHasService)
    }))
  }

  private async saveHours () {
    const { hours } = this.data

    if (!hours || !hours.length) {
      return
    }

    const savedHours = await this.transactionalEntityManager.find(ProfessionalHours, {
      where: { professionalId: this.professional.id }
    })

    await this.transactionalEntityManager.remove(savedHours)

    return Promise.all(hours.map((hour: any) => {
      const professionalHours = this.transactionalEntityManager.create(ProfessionalHours, {
        ...hour,
        business: this.business,
        professional: this.professional
      })

      return this.transactionalEntityManager.save(professionalHours)
    }))
  }
}
