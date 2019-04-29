import { getManager, EntityManager } from 'typeorm'
import Plan from '../models/Plan'
import NotFoundException from '../exceptions/NotFoundException'
import Address from '../models/Address'
import BusinessType from '../models/BusinessType'
import Business from '../models/Business'
import BusinessSocial from '../models/BusinessSocial'
import BusinessInfo from '../models/BusinessInfo'
import ServiceCategory from '../models/ServiceCategory'
import Service from '../models/Service'
import ServiceDetail from '../models/ServiceDetail'
import UserGroup from '../models/UserGroup'
import User from '../models/User'
import Professional from '../models/Professional'
import BusinessHours from '../models/BusinessHours'
import ProfessionalHours from '../models/ProfessionalHours'
import ProfessionalHasService from '../models/ProfessionalHasService'
import BusinessHasUser from '../models/BusinessHasUser'
import { ISetupOptions, IServicesRef, IUser } from '../interfaces/ISetupOptions'
import ConflictException from '../exceptions/ConflictException'

export default class SetupService {
  private transactionalEntityManager: EntityManager
  private data: ISetupOptions
  private business: Business;
  private servicesRef: IServicesRef[] = [];

  public async create (data: ISetupOptions) {
    this.data = data
    await getManager().transaction(async transactionalEntityManager => {
      this.transactionalEntityManager = transactionalEntityManager
      await this.createBusiness()
      await this.createBusinessRelated()
      await this.createServices()
      await this.createProfessionals()
    })
  }

  private async createBusiness () {
    const { planId, businessTypeId, address, ...businessData } = this.data.business

    const plan = await this.transactionalEntityManager.findOne(Plan, planId)

    if (!plan) {
      throw new NotFoundException('Plano não encontrado')
    }

    const businessType = await this.transactionalEntityManager.findOne(BusinessType, businessTypeId)

    if (!businessType) {
      throw new NotFoundException('businessType não encontrado')
    }

    const addressEntity = this.transactionalEntityManager.create(Address, address)
    await this.transactionalEntityManager.save(addressEntity)

    const business = this.transactionalEntityManager.create(Business, {
      name: businessData.name,
      businessType,
      address: addressEntity,
      plan,
      phoneNumber: businessData.phoneNumber,
      landlineNumber: businessData.landlineNumber,
      email: businessData.email,
      description: businessData.description
    })

    await this.transactionalEntityManager.save(business)

    this.business = business
  }

  private async createBusinessRelated () {
    const { social, info, hours } = this.data.business

    const businessSocial = this.transactionalEntityManager.create(BusinessSocial, {
      ...social,
      business: this.business
    })

    const businessInfo = this.transactionalEntityManager.create(BusinessInfo, {
      ...info,
      business: this.business
    })

    const saveBusinessHours = () => {
      return Promise.all(hours.map(async (hour) => {
        const businessHours = this.transactionalEntityManager.create(BusinessHours, {
          ...hour,
          business: this.business
        })

        await this.transactionalEntityManager.save(businessHours)
      }))
    }

    await Promise.all([
      this.transactionalEntityManager.save(businessSocial),
      this.transactionalEntityManager.save(businessInfo),
      saveBusinessHours()
    ])
  }

  private async createServices () {
    await Promise.all(this.data.services.map(async (serviceItem) => {
      const { id, name, ref, serviceCategoryId, details } = serviceItem

      let service

      if (id) {
        service = await this.transactionalEntityManager.findOne(Service, { where: { id, preset: true } })

        if (!service) throw new NotFoundException('Serviço não encontrado')
      } else {
        const serviceCategory = await this.transactionalEntityManager.findOne(ServiceCategory, serviceCategoryId)

        if (!serviceCategory) {
          throw new NotFoundException('serviceCategory não encontrado')
        }

        this.transactionalEntityManager.create(Service, {})

        service = this.transactionalEntityManager.create(Service, {
          name,
          category: serviceCategory,
          business: this.business
        })

        await this.transactionalEntityManager.save(service)
      }

      if (ref) this.servicesRef.push({ serviceId: service.id, ref })

      const serviceDetail = this.transactionalEntityManager.create(ServiceDetail, {
        ...details,
        service,
        business: this.business
      })

      await this.transactionalEntityManager.save(serviceDetail)
    }))
  }

  private async createProfessionals () {
    await Promise.all(this.data.professionals.map(async (professionalItem) => {
      const { user: userData, hours, services, ...professionalData } = professionalItem

      const user = await this.createUser(userData)

      const professional = this.transactionalEntityManager.create(Professional, {
        name: professionalData.name,
        nickname: professionalData.nickname,
        user,
        business: this.business
      })

      await this.transactionalEntityManager.save(professional)

      const attachServices = Promise.all(this.servicesRef.map(async (serviceRef) => {
        if (!services.includes(serviceRef.ref)) return

        const professionalHasService = this.transactionalEntityManager.create(ProfessionalHasService, {
          professionalId: professional.id,
          serviceId: serviceRef.serviceId
        })

        await this.transactionalEntityManager.save(professionalHasService)
      }))

      const saveHours = Promise.all(hours.map(async (hour: any) => {
        const professionalHours = this.transactionalEntityManager.create(ProfessionalHours, {
          ...hour,
          business: this.business,
          professional
        })

        await this.transactionalEntityManager.save(professionalHours)
      }))

      await Promise.all([attachServices, saveHours])
    }))
  }

  private async createUser (userData: IUser) {
    const { email, password, userGroupId } = userData
    const userGroup = await this.transactionalEntityManager.findOne(UserGroup, userGroupId)

    if (!userGroup) {
      throw new NotFoundException('userGroup não encontrado')
    }

    const userAlreadyExists = await this.transactionalEntityManager.findOne(User, { where: { email } })

    if (userAlreadyExists) throw new ConflictException(`Já existe um usuário com este email cadastrado: ${email}`)

    const user = this.transactionalEntityManager.create(User, {
      email,
      password,
      userGroup
    })

    await this.transactionalEntityManager.save(user)

    const businessHasUser = this.transactionalEntityManager.create(BusinessHasUser, {
      businessId: this.business.id,
      userId: user.id,
      active: true
    })

    await this.transactionalEntityManager.save(businessHasUser)

    return user
  }
}
