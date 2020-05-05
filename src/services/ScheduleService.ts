import { getManager, EntityManager, Not, In } from 'typeorm'
import Schedule from '../models/Schedule'
import Business from '../models/Business'
import { IScheduleOptions } from '../interfaces/IScheduleOptions'
import InvalidException from '../exceptions/InvalidException'
import NotFoundException from '../exceptions/NotFoundException'
import Professional from '../models/Professional'
import TimeHelper from '../helpers/TimeHelper'
import Service from '../models/Service'
import Customer from '../models/Customer'
import ScheduleHasService from '../models/ScheduleHasService'
import { IScheduleInput } from '../interfaces/IScheduleInput'

export default class ScheduleService {
  private schedule: Schedule
  private business: Business
  private data: IScheduleInput
  private transactionalEntityManager: EntityManager
  private professional: Professional
  private services: Service[]
  private customer: Customer
  private scheduleStatus = 1;
  private options?: IScheduleOptions
  private order: { amount: number; business: Business; status: number; items: object[] }

  public constructor (business?: Business) {
    this.setBusiness(business)
  }

  public async create (data: IScheduleInput, options?: IScheduleOptions) {
    this.data = data
    this.options = options

    await getManager().transaction(async transactionalEntityManager => {
      this.transactionalEntityManager = transactionalEntityManager

      await this.getBusiness()
      await this.isBusinessOpen()

      await this.getProfessional()
      await this.isProfessionalAvailable()

      if (this.isBlock()) {
        await this.save()
        return
      }

      await this.getServices()
      await this.getCustomer()
      await this.setOrder()
      await this.save()
    })

    return this.schedule
  }

  private async getBusiness () {
    if (this.business) {
      return
    }

    const { businessId } = this.data

    if (!businessId) {
      throw new InvalidException('Não foi possível determinar o estabelecimento')
    }

    const business = await this.transactionalEntityManager.findOne(Business, businessId, {
      relations: ['businessHours']
    })

    if (!business) {
      throw new NotFoundException('Estabelecimento não encontrado')
    }

    this.business = business
  }

  private async isBusinessOpen () {
    const { businessHours } = this.business

    console.log(this.business.businessHours)

    if (!businessHours || !businessHours.length) {
      throw new NotFoundException('Estabelecimento não possui horário de atendimento configurado')
    }

    const { weekDay, startAt, endAt } = this.data
    const timeRangesByWeekDay = businessHours.filter(hour => hour.weekDay === weekDay)

    const isOpen = timeRangesByWeekDay.some(range => {
      const { open, closed } = range

      if (!open || !closed) {
        return false
      }

      const options = {
        startTime: open,
        endTime: closed
      }

      return TimeHelper.withinRange({ ...options, time: startAt }) &&
        TimeHelper.withinRange({ ...options, time: endAt })
    })

    if (!isOpen) {
      throw new InvalidException('Agendamento fora do horário de atendimento do estabelecimento')
    }
  }

  private async getProfessional () {
    const { professionalId } = this.data

    const professional = await this.transactionalEntityManager.findOne(Professional, {
      where: { id: professionalId, business: this.business },
      relations: ['hours', 'schedules']
    })

    if (!professional) {
      throw new NotFoundException('profissional não encontrado')
    }

    this.professional = professional
  }

  private async isProfessionalAvailable () {
    this.checkIfProfessionalHasTimeConfigured()
    await this.checkIfProfessionalHasTimeAvailable()
  }

  private checkIfProfessionalHasTimeConfigured () {
    const { hours } = this.professional

    if (!hours || !hours.length) {
      throw new NotFoundException('Profissional não possui agenda configurada')
    }

    const { startAt, endAt, weekDay } = this.data

    const isTimeAvailable = hours.some(hour => {
      const options = {
        startTime: hour.startAt,
        endTime: hour.endAt
      }

      return hour.weekDay === weekDay &&
        TimeHelper.withinRange({ ...options, time: startAt }) &&
        TimeHelper.withinRange({ ...options, time: endAt })
    })

    if (!isTimeAvailable) {
      throw new InvalidException('Horário indisponível')
    }
  }

  private async checkIfProfessionalHasTimeAvailable () {
    const { scheduledTo, startAt, endAt } = this.data

    const schedules = await this.transactionalEntityManager.find(Schedule, {
      where: {
        professional: this.professional,
        business: this.business,
        scheduledTo,
        status: Not(In([3, 4]))
      }
    })

    let isBusy = false

    if (schedules) {
      isBusy = schedules.some(schedule => {
        const currentSchedule = {
          startTime: schedule.startAt,
          endTime: schedule.endAt
        }

        const incomingSchedule = {
          startTime: startAt,
          endTime: endAt
        }

        return TimeHelper.overlapsRanges(currentSchedule, incomingSchedule)
      })
    }

    if (isBusy) {
      throw new InvalidException('Horário ocupado')
    }
  }

  private isBlock () {
    return !!this.data.block
  }

  private async getServices () {
    const { services: servicesInput } = this.data

    if (!servicesInput || !servicesInput.length) {
      throw new NotFoundException('Nenhum serviço foi fornecido para agendamento')
    }

    console.log(servicesInput)

    const services = await this.transactionalEntityManager.find(Service, {
      where: { id: In(servicesInput), business: this.business },
      relations: ['serviceDetails']
    })

    if (!services || !services.length) {
      throw new NotFoundException('Serviços não encontrados')
    }

    this.services = services
  }

  private async getCustomer () {
    const { customerId } = this.data

    const customer = await this.transactionalEntityManager.findOne(Customer, customerId)

    if (!customer) {
      throw new NotFoundException('cliente não encontrado')
    }

    this.customer = customer
  }

  private async save (isUpdate = false) {
    const { ...scheduleData } = this.data

    const plainObject = {
      scheduledTo: scheduleData.scheduledTo,
      weekDay: scheduleData.weekDay,
      startAt: scheduleData.startAt,
      endAt: scheduleData.endAt,
      note: scheduleData.note,
      block: scheduleData.block,
      business: this.business
    }

    if (this.customer) {
      Object.assign(plainObject, { customer: this.customer })
    }

    if (this.professional) {
      Object.assign(plainObject, { professional: this.professional })
    }

    if (this.scheduleStatus) {
      Object.assign(plainObject, { status: this.scheduleStatus })
    }

    if (this.order) {
      Object.assign(plainObject, { orders: [this.order] })
    }

    if (isUpdate) {
      Object.assign(plainObject, { id: this.schedule.id })
    }

    const schedule = this.transactionalEntityManager.create(Schedule, plainObject)
    await this.transactionalEntityManager.save(schedule)

    if (this.services) {
      await Promise.all(this.services.map(service => {
        const plainObject = {
          scheduleId: schedule.id,
          serviceId: service.id
        }

        return this.transactionalEntityManager.save(ScheduleHasService, plainObject)
      }))
    }

    this.schedule = schedule
  }

  private setBusiness (business?: Business) {
    if (business) {
      this.business = business
    }
  }

  private setOrder () {
    if (!this.options || !this.options.createOrder) {
      return
    }

    const orderInput = this.services.reduce((accum, service) => {
      const { serviceDetails, name, id } = service

      if (!serviceDetails || !serviceDetails.length) {
        return accum
      }

      const { price } = serviceDetails[0]

      accum.amount += price

      const orderItem = {
        name,
        quantity: 1,
        price,
        discount: 0,
        isTip: false,
        serviceId: id
      }

      accum.items.push(orderItem)

      return accum
    }, { amount: 0, items: [] as object[] })

    this.order = {
      amount: orderInput.amount,
      business: this.business,
      status: 1,
      items: orderInput.items
    }
  }
}
