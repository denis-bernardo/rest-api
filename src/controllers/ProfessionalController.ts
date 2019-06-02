import { Request, Response } from 'express'
import ProfessionalRepository from '../repositories/ProfessionalRepository'

export default class ProfessionalController {
  public async list (req: Request, res: Response) {

  }

  public async create (req: Request, res: Response) {
    // create user
    // create professional with related
    
    const { details, ...serviceData } = req.body
    const professionalRepository = getCustomRepository(ProfessionalRepository)

    const serviceCategory = await serviceCategoryRepository.findOne(serviceData.serviceCategoryId)

    if (!serviceCategory) {
      throw new NotFoundException('serviceCategory não encontrada')
    }

    const serviceDetails = serviceDetailRepository.create({
      ...details,
      business: req.business
    })

    const service = serviceRepository.create({
      ...serviceData,
      preset: false,
      serviceCategory,
      business: req.business,
      serviceDetails: [serviceDetails]
    })

    await serviceRepository.save(service)
    return res.status(201).json(service)
  }

  public async show (req: Request, res: Response) {

  }

  public async update (req: Request, res: Response) {

  }

  public async destroy (req: Request, res: Response) {

  }
}
