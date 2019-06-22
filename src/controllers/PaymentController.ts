import { Request, Response } from 'express'
import PaymentRepository from '../repositories/PaymentRepository'
import { getCustomRepository } from 'typeorm'

export default class PaymentController {
  public async list (req: Request, res: Response) {
    const paymentRepository = getCustomRepository(PaymentRepository)
    const payments = await paymentRepository.paginate(req.query.page, req.query.limit, {
      order: { createdAt: 'DESC' },
      where: [
        { preset: true }
      ]
    })
    return res.json(payments)
  }

  public async show (req: Request, res: Response) {
    const paymentRepository = getCustomRepository(PaymentRepository)
    const payment = await paymentRepository.findOne({
      where: { id: req.params.id }
    })

    return res.json(payment)
  }
}
