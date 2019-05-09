import { Request, Response } from 'express'
import ServiceRepository from '../repositories/ServiceRepository'
import { getCustomRepository } from 'typeorm'
import ServiceCategoryRepository from '../repositories/ServiceCategoryRepository'
import NotFoundException from '../exceptions/NotFoundException'
import ServiceDetailRepository from '../repositories/ServiceDetail'

export default class ServiceController {
  public async list (req: Request, res: Response) {
    const serviceRepository = getCustomRepository(ServiceRepository)
    const response = await serviceRepository.paginate(req.query.page, req.query.limit, {
      order: { createdAt: 'DESC' },
      where: [
        { business: { id: req.business.id } },
        { preset: true }
      ],
      relations: ['serviceDetails']
    })
    return res.json(response)
  }

  public async create (req: Request, res: Response) {
    const { details, ...serviceData } = req.body
    const serviceRepository = getCustomRepository(ServiceRepository)
    const serviceDetailRepository = getCustomRepository(ServiceDetailRepository)
    const serviceCategoryRepository = getCustomRepository(ServiceCategoryRepository)
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
    const serviceRepository = getCustomRepository(ServiceRepository)
    const service = await serviceRepository.findOne({
      where: { id: req.params.id, business: req.business },
      relations: ['serviceDetails']
    })

    return res.json(service)
  }

  public async update (req: Request, res: Response) {
    const { details, ...serviceData } = req.body
    const id = req.params.id
    const serviceRepository = getCustomRepository(ServiceRepository)
    const serviceDetailRepository = getCustomRepository(ServiceDetailRepository)
    const serviceCategoryRepository = getCustomRepository(ServiceCategoryRepository)
    const serviceCategory = await serviceCategoryRepository.findOne(serviceData.serviceCategoryId)

    if (!serviceCategory) {
      throw new NotFoundException('serviceCategory não encontrada')
    }

    const service = await serviceRepository.findOne({
      where: { id, business: req.business }
    })

    if (!service) {
      throw new NotFoundException('Serviço não encontrado')
    }

    const serviceDetails = serviceDetailRepository.create({
      ...details,
      business: req.business
    })

    const serviceEntity = serviceRepository.create({
      ...serviceData,
      preset: false,
      id,
      business: req.business,
      serviceDetails: [serviceDetails]
    })

    await serviceRepository.save(serviceEntity)
    return res.json(service)
  }

  public async destroy (req: Request, res: Response) {
    const serviceRepository = getCustomRepository(ServiceRepository)
    const service = await serviceRepository.findOne({ where: { id: req.params.id, business: req.business } })

    if (!service) {
      throw new NotFoundException('Serviço não encontrado')
    }

    await serviceRepository.remove(service)
    return res.status(204).send()
  }
}
