import { Request, Response } from 'express'
import ProfessionalService from '../services/ProfessionalService'
import ProfessionalRepository from '../repositories/ProfessionalRepository'
import { getCustomRepository } from 'typeorm'
import NotFoundException from '../exceptions/NotFoundException'

export default class ProfessionalController {
  public async list (req: Request, res: Response) {
    const professionalRepository = getCustomRepository(ProfessionalRepository)
    const professionals = await professionalRepository.paginate(req.query.page, req.query.limit, {
      order: { createdAt: 'DESC' },
      where: [
        { business: { id: req.business.id } }
      ]
    })

    return res.json(professionals)
  }

  public async create (req: Request, res: Response) {
    const professionalService = new ProfessionalService(req.business)
    const professional = await professionalService.create(req.body)
    return res.status(201).json(professional)
  }

  public async show (req: Request, res: Response) {
    const professionalRepository = getCustomRepository(ProfessionalRepository)
    const professional = await professionalRepository.findOne({
      where: { id: req.params.id, business: req.business },
      relations: ['user', 'business', 'hours', 'services']
    })

    if (!professional) {
      throw new NotFoundException('Profissional não encontrado')
    }

    return res.json(professional)
  }

  public async update (req: Request, res: Response) {
    const professionalService = new ProfessionalService(req.business)
    const professional = await professionalService.update(req.params.id, req.body)
    return res.json(professional)
  }

  public async destroy (req: Request, res: Response) {
    const professionalRepository = getCustomRepository(ProfessionalRepository)
    const professional = await professionalRepository.findOne({
      where: { id: req.params.id, business: req.business }
    })

    if (!professional) {
      throw new NotFoundException('Profissional não encontrado')
    }

    await professionalRepository.remove(professional)
    return res.status(204).send()
  }
}
