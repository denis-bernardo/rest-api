import { getManager, EntityManager } from 'typeorm'
import NotFoundException from '../exceptions/NotFoundException'
import Business from '../models/Business'
import UserGroup from '../models/UserGroup'
import User from '../models/User'
import Customer from '../models/Customer'
import ConflictException from '../exceptions/ConflictException'
import { ICustomerOptions } from '../interfaces/ICustomerOptions'
import Address from '../models/Address'
import BusinessHasCustomer from '../models/BusinessHasCustomer'

export default class CustomerService {
  private transactionalEntityManager: EntityManager
  private data: ICustomerOptions
  private business: Business;
  private user?: User;
  private customer: Customer;
  private id?: string;
  private address?: Address;

  public constructor (business: Business) {
    this.business = business
  }

  public async create (data: ICustomerOptions) {
    this.data = data
    await getManager().transaction(async transactionalEntityManager => {
      this.transactionalEntityManager = transactionalEntityManager
      await this.createUser()
      await this.saveAddress()
      await this.saveCustomer()
      await this.attachBusiness()
    })

    return this.customer
  }

  public async update (id: string, data: ICustomerOptions) {
    this.id = id
    this.data = data
    await getManager().transaction(async transactionalEntityManager => {
      this.transactionalEntityManager = transactionalEntityManager
      await this.retriveCustomer()
      await this.saveAddress(true)
      await this.saveCustomer(true)
    })

    return this.customer
  }

  private async createUser () {
    if (!this.data.user) {
      return
    }

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

    this.user = user
  }

  private async saveAddress (isUpdate = false) {
    if (!this.data.address) {
      return
    }

    if (isUpdate && this.customer.address) {
      Object.assign(this.data.address, { id: this.customer.address.id })
    }

    const address = this.transactionalEntityManager.create(Address, this.data.address)

    await this.transactionalEntityManager.save(address)

    this.address = address
  }

  private async saveCustomer (isUpdate = false) {
    const { ...customerData } = this.data

    const plainObject = {
      name: customerData.name,
      gender: customerData.gender,
      birthDate: customerData.birthDate,
      phoneNumber: customerData.phoneNumber
    }

    if (this.user) {
      Object.assign(plainObject, { user: this.user })
    }

    if (this.address) {
      Object.assign(plainObject, { address: this.address })
    }

    if (isUpdate) {
      Object.assign(plainObject, { id: this.customer.id })
    }

    const customer = this.transactionalEntityManager.create(Customer, plainObject)

    await this.transactionalEntityManager.save(customer)

    this.customer = customer
  }

  private async retriveCustomer () {
    const customer = await this.transactionalEntityManager
      .createQueryBuilder(Customer, 'customer')
      .innerJoinAndSelect('customer.businesses', 'business', 'business.businessId = :businessId', { businessId: this.business.id })
      .where('customer.id = :id', { id: this.id })
      .getOne()

    if (!customer) {
      throw new NotFoundException('Cliente não encontrado')
    }

    this.customer = customer
  }

  private async attachBusiness () {
    const businessHasCustomer = this.transactionalEntityManager.create(BusinessHasCustomer, {
      businessId: this.business.id,
      customerId: this.customer.id
    })

    await this.transactionalEntityManager.save(businessHasCustomer)
  }
}
