import { getManager, EntityManager } from 'typeorm'
import NotFoundException from '../exceptions/NotFoundException'
import Business from '../models/Business'
import Customer from '../models/Customer'
import Order from '../models/Order'
import { IOrderOptions } from '../interfaces/IOrderOptions'
import OrderStatus from '../models/OrderStatus'
import Payment from '../models/Payment'
import Professional from '../models/Professional'
import Schedule from '../models/Schedule'
import OrderItem from '../models/OrderItem'
import Service from '../models/Service'
import Product from '../models/Product'

export default class OrderService {
  private transactionalEntityManager: EntityManager
  private data: IOrderOptions
  private business: Business;
  private customer: Customer;
  private id?: string;
  private orderStatus: OrderStatus;
  private payment: Payment;
  private professional: Professional;
  private cashier: Professional;
  private order: Order;
  private schedule: Schedule

  public constructor (business: Business) {
    this.business = business
  }

  public async create (data: IOrderOptions) {
    this.data = data
    await getManager().transaction(async transactionalEntityManager => {
      this.transactionalEntityManager = transactionalEntityManager
      await this.getOrderRelationships()
      await this.saveOrder()
      await this.saveOrderItems()
    })

    return this.order
  }

  public async update (id: string, data: IOrderOptions) {
    this.id = id
    this.data = data
    await getManager().transaction(async transactionalEntityManager => {
      this.transactionalEntityManager = transactionalEntityManager
      await this.getOrder()
      await this.getOrderRelationships()
      await this.saveOrder(true)
      await this.saveOrderItems()
    })

    return this.order
  }

  private async saveOrder (isUpdate = false) {
    const { ...orderData } = this.data

    const plainObject = {
      note: orderData.note,
      amount: orderData.amount,
      amountReceived: orderData.amountReceived,
      business: this.business
    }

    if (this.orderStatus) {
      Object.assign(plainObject, { status: this.orderStatus })
    }

    if (this.payment) {
      Object.assign(plainObject, { payment: this.payment })
    }

    if (this.professional) {
      Object.assign(plainObject, { professional: this.professional })
    }

    if (this.customer) {
      Object.assign(plainObject, { customer: this.customer })
    }

    if (this.cashier) {
      Object.assign(plainObject, { cashier: this.cashier })
    }

    if (this.schedule) {
      Object.assign(plainObject, { schedule: this.schedule })
    }

    if (isUpdate) {
      Object.assign(plainObject, { id: this.order.id })
    }

    const order = this.transactionalEntityManager.create(Order, plainObject)

    await this.transactionalEntityManager.save(order)

    this.order = order
  }

  private async saveOrderItems () {
    const { items } = this.data

    if (!items || !items.length) {
      return
    }

    const savedOrderItems = await this.transactionalEntityManager.find(OrderItem, {
      where: { orderId: this.order.id }
    })

    await this.transactionalEntityManager.remove(savedOrderItems)

    return Promise.all(items.map(async (item) => {
      try {
        const plainObject = {
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          discount: item.discount,
          isTip: item.isTip,
          order: this.order
        }

        if (item.serviceId) {
          const service = await this.getService(item.serviceId)
          Object.assign(plainObject, { service })
        }

        if (item.productId) {
          const product = await this.getProduct(item.productId)
          Object.assign(plainObject, { product })
        }

        const orderItem = this.transactionalEntityManager.create(OrderItem, plainObject)
        return this.transactionalEntityManager.save(orderItem)
      } catch (err) {
        console.error('Handle error on save order items', err.message)
      }
    }))
  }

  private async getOrder () {
    const order = await this.transactionalEntityManager.findOne(Order, {
      where: { id: this.id, business: this.business }
    })

    if (!order) {
      throw new NotFoundException('Pedido não encontrado')
    }

    this.order = order
  }

  private async getOrderStatus () {
    const orderStatus = await this.transactionalEntityManager
      .findOne(OrderStatus, this.data.orderStatusId)

    if (!orderStatus) {
      throw new NotFoundException('OrderStatus não encontrado')
    }

    this.orderStatus = orderStatus
  }

  private async getOrderRelationships () {
    await Promise.all([
      this.getOrderStatus(),
      this.getPayment(),
      this.getCustomer(),
      this.getProfessional(),
      this.getCashier(),
      this.getSchedule()
    ])
  }

  private async getPayment () {
    if (!this.data.paymentId) {
      return
    }

    const payment = await this.transactionalEntityManager.findOne(Payment, {
      where: [
        { id: this.data.paymentId, business: this.business },
        { id: this.data.paymentId, preset: true }
      ]
    })

    if (!payment) {
      throw new NotFoundException('payment não encontrado')
    }

    this.payment = payment
  }

  private async getCustomer () {
    if (!this.data.customerId) {
      return
    }

    const customer = await this.transactionalEntityManager
      .findOne(Customer, this.data.customerId)

    if (!customer) {
      throw new NotFoundException('customer não encontrado')
    }

    this.customer = customer
  }

  private async getProfessional () {
    if (!this.data.professionalId) {
      return
    }

    const professional = await this.transactionalEntityManager.findOne(Professional, {
      where: { id: this.data.professionalId, business: this.business }
    })

    if (!professional) {
      throw new NotFoundException('professional não encontrado')
    }

    this.professional = professional
  }

  private async getSchedule () {
    if (!this.data.scheduleId) {
      return
    }

    const schedule = await this.transactionalEntityManager.findOne(Schedule, {
      where: { id: this.data.scheduleId, business: this.business }
    })

    if (!schedule) {
      throw new NotFoundException('agendamento não encontrado')
    }

    this.schedule = schedule
  }

  private async getCashier () {
    if (!this.data.cashierId) {
      return
    }

    const cashier = await this.transactionalEntityManager.findOne(Professional, {
      where: { id: this.data.cashierId, business: this.business }
    })

    if (!cashier) {
      throw new NotFoundException('profissional (caixa) não encontrado')
    }

    this.cashier = cashier
  }

  private async getService (id: string) {
    const service = await this.transactionalEntityManager.findOne(Service, {
      where: [
        { id, business: this.business },
        { id, preset: true }
      ]
    })

    if (!service) {
      throw new NotFoundException('serviço não encontrado')
    }

    return service
  }

  private async getProduct (id: number) {
    const product = await this.transactionalEntityManager.findOne(Product, {
      where: { id, business: this.business }
    })

    if (!product) {
      throw new NotFoundException('produto não encontrado')
    }

    return product
  }
}
