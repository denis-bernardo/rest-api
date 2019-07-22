import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import OrderRepository from '../repositories/OrderRepository'
import NotFoundException from '../exceptions/NotFoundException'
import OrderService from '../services/OrderService'

export default class OrderController {
  public async list (req: Request, res: Response) {
    const orderRepository = getCustomRepository(OrderRepository)
    const orders = await orderRepository.paginate(req.query.page, req.query.limit, {
      order: { createdAt: 'DESC' },
      where: [
        { business: { id: req.business.id } }
      ]
    })

    return res.json(orders)
  }

  public async create (req: Request, res: Response) {
    const orderService = new OrderService(req.business)
    const order = await orderService.create(req.body)
    return res.status(201).json(order)
  }

  public async show (req: Request, res: Response) {
    const orderRepository = getCustomRepository(OrderRepository)
    const order = await orderRepository.findOne({
      where: { id: req.params.id, business: req.business },
      relations: ['items', 'cashier', 'customer', 'professional', 'payment', 'status', 'schedule']
    })

    if (!order) {
      throw new NotFoundException('Pedido não encontrado')
    }

    return res.json(order)
  }

  public async update (req: Request, res: Response) {
    const orderService = new OrderService(req.business)
    const order = await orderService.update(req.params.id, req.body)
    return res.json(order)
  }

  public async destroy (req: Request, res: Response) {
    const orderRepository = getCustomRepository(OrderRepository)
    const order = await orderRepository.findOne({
      where: { id: req.params.id, business: req.business }
    })

    if (!order) {
      throw new NotFoundException('Pedido não encontrado')
    }

    await orderRepository.remove(order)
    return res.status(204).send()
  }
}
