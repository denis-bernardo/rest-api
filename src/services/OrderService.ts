import { getManager, EntityManager, getCustomRepository } from 'typeorm'
import NotFoundException from '../exceptions/NotFoundException'
import Business from '../models/Business'
import UserGroup from '../models/UserGroup'
import User from '../models/User'
import Customer from '../models/Customer'
import ConflictException from '../exceptions/ConflictException'
import { IOrderOptions } from '../interfaces/IOrderOptions'
import Address from '../models/Address'
import BusinessHasCustomer from '../models/BusinessHasCustomer'
import OrderStatusRepository from '../repositories/OrderStatusRepository';
import OrderStatus from '../models/OrderStatus';
import Payment from '../models/Payment';
import Professional from '../models/Professional';

export default class OrderService {
  private transactionalEntityManager: EntityManager
  private data: IOrderOptions
  private business: Business;
  private user?: User;
  private customer: Customer;
  private id?: string;
  private address?: Address;
  private orderStatus: OrderStatus;
  private payment: Payment;
  professional: Professional;

  public constructor (business: Business) {
    this.business = business
  }

  public async create (data: IOrderOptions) {
    this.data = data
    await getManager().transaction(async transactionalEntityManager => {
      this.transactionalEntityManager = transactionalEntityManager
      // find order status
      await this.getOrderStatus()
      // find payment
      await this.getPayment()
      // find customer
      await this.getCustomer()
      // find professional
      await this.getProfessional()
      // find cashier
      // find schedule

      await this.saveOrder()
      await this.saveOrderItems()
    })

    return this.customer
  }

  public async update (id: string, data: IOrderOptions) {
    this.id = id
    this.data = data
    await getManager().transaction(async transactionalEntityManager => {
      this.transactionalEntityManager = transactionalEntityManager
      await this.retrieveOrder()
      await this.saveOrder(true)
      await this.saveOrderItems(true)
    })

    return this.customer
  }

  private async saveOrder (isUpdate = false) {
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

  private async saveOrderItems (isUpdate = false) {
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

  private async getOrderStatus () {
    const orderStatus = await this.transactionalEntityManager
      .findOne(OrderStatus, this.data.orderStatusId)

    if (!orderStatus) {
      throw new NotFoundException('OrderStatus não encontrado')
    }

    this.orderStatus = orderStatus
  }

  private async getPayment () {
    const payment = await this.transactionalEntityManager
      .findOne(Payment, this.data.paymentId)

    if (!payment) {
      throw new NotFoundException('payment não encontrado')
    }

    this.payment = payment
  }

  private async getCustomer () {
    const customer = await this.transactionalEntityManager
      .findOne(Customer, this.data.customerId)

    if (!customer) {
      throw new NotFoundException('customer não encontrado')
    }

    this.customer = customer
  }

  private async getProfessional () {
    const professional = await this.transactionalEntityManager
      .findOne(Professional, this.data.professionalId)

    if (!professional) {
      throw new NotFoundException('professional não encontrado')
    }

    this.professional = professional
  }
}
