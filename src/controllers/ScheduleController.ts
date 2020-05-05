import { Request, Response } from 'express'
import ScheduleService from '../services/ScheduleService'
import { getCustomRepository } from 'typeorm'
import ScheduleRepository from '../repositories/ScheduleRepository'
import NotFoundException from '../exceptions/NotFoundException'

export default class ScheduleController {
  public async create (req: Request, res: Response) {
    const scheduleService = new ScheduleService(req.business)
    const schedule = await scheduleService.create(req.body, { createOrder: true })
    return res.status(201).json(schedule)
  }

  public async list (req: Request, res: Response) {
    const scheduleRepository = getCustomRepository(ScheduleRepository)

    const schedules = await scheduleRepository.paginate(req.query.page, req.query.limit, {
      order: { createdAt: 'DESC' },
      where: [
        { business: { id: req.business.id } }
      ]
    })

    return res.json(schedules)
  }

  public async show (req: Request, res: Response) {
    const scheduleRepository = getCustomRepository(ScheduleRepository)

    const schedule = await scheduleRepository.findOne({
      where: { id: req.params.id, business: req.business },
      relations: ['professional', 'customer', 'status', 'services']
    })

    if (!schedule) {
      throw new NotFoundException('Agendamento não encontrado')
    }

    return res.json(schedule)
  }
}
