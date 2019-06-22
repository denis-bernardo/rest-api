import { Request, Response } from 'express'
import CustomerRepository from '../repositories/CustomerRepository'
import { getCustomRepository } from 'typeorm'
import NotFoundException from '../exceptions/NotFoundException'
import CustomerService from '../services/CustomerService'

export default class CustomerController {
  public async list (req: Request, res: Response) {
    const customerRepository = getCustomRepository(CustomerRepository)
    const customers = await customerRepository
      .createQueryBuilder('customer')
      .innerJoinAndSelect('customer.businesses', 'business', 'business.businessId = :businessId', { businessId: req.business.id })
      .where('customer.id = :id', { id: req.params.id })
      .orderBy('customer.createdAt', 'DESC')
      .getMany()

    return res.json(customers)
  }

  public async create (req: Request, res: Response) {
    const customerService = new CustomerService(req.business)
    const customer = await customerService.create(req.body)
    return res.status(201).json(customer)
  }

  public async show (req: Request, res: Response) {
    const customerRepository = getCustomRepository(CustomerRepository)

    const customer = await customerRepository
      .createQueryBuilder('customer')
      .innerJoinAndSelect('customer.businesses', 'business', 'business.businessId = :businessId', { businessId: req.business.id })
      .leftJoinAndSelect('customer.user', 'user')
      .leftJoinAndSelect('customer.address', 'address')
      .where('customer.id = :id', { id: req.params.id })
      .getOne()

    if (!customer) {
      throw new NotFoundException('Cliente não encontrado')
    }

    return res.json(customer)
  }

  public async update (req: Request, res: Response) {
    const customerService = new CustomerService(req.business)
    const customer = await customerService.update(req.params.id, req.body)
    return res.json(customer)
  }

  public async destroy (req: Request, res: Response) {
    const customerRepository = getCustomRepository(CustomerRepository)
    const customer = await customerRepository
      .createQueryBuilder('customer')
      .innerJoinAndSelect('customer.businesses', 'business', 'business.businessId = :businessId', { businessId: req.business.id })
      .where('customer.id = :id', { id: req.params.id })
      .getOne()

    if (!customer) {
      throw new NotFoundException('Cliente não encontrado')
    }

    await customerRepository.remove(customer)
    return res.status(204).send()
  }
}
