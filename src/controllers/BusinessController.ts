import { Request, Response } from 'express'
import BusinessRepository from '../repositories/BusinessRepository'
import BusinessTypeRepository from '../repositories/BusinessTypeRepository'
import { getCustomRepository } from 'typeorm'
import AddressRepository from '../repositories/AddressRepository'
import PlanRepository from '../repositories/PlanRepository'

export default class BusinessController {
  public async list (req: Request, res: Response) {
    const businessRepository = getCustomRepository(BusinessRepository)
    const response = await businessRepository.paginate(req.query.page, req.query.limit)
    return res.json(response)
  }

  public async create (req: Request, res: Response) {
    const businessRepository = getCustomRepository(BusinessRepository)
    const businessTypeRepository = getCustomRepository(BusinessTypeRepository)
    const addressRepository = getCustomRepository(AddressRepository)
    const planRepository = getCustomRepository(PlanRepository)

    const businessType = await businessTypeRepository.findOne(req.body.businessTypeId)
    const plan = await planRepository.findOne(req.body.planId)

    const address = addressRepository.create(req.body.address as object)
    await addressRepository.save(address)

    const business = businessRepository.create({
      name: req.body.name,
      businessType,
      address: address,
      plan
    })

    await businessRepository.save(business)
    return res.status(201).json(business)
  }

  public async show (req: Request, res: Response) {
    const businessRepository = getCustomRepository(BusinessRepository)
    const response = await businessRepository.findOne({
      where: { id: req.params.id },
      relations: ['businessType', 'address', 'plan']
    })

    return res.json(response)
  }

  public async update (req: Request, res: Response) {
    const businessRepository = getCustomRepository(BusinessRepository)
    const businessTypeRepository = getCustomRepository(BusinessTypeRepository)
    const addressRepository = getCustomRepository(AddressRepository)

    let businessType
    if (req.body.businessTypeId) {
      businessType = await businessTypeRepository.findOne(req.body.businessTypeId)
    }

    let address
    if (req.body.address) {
      address = addressRepository.create(req.body.address as object)
      await addressRepository.save(address)
    }

    const data: object = {
      ...req.body,
      id: req.params.id,
      businessType,
      address
    }

    const business = businessRepository.create(data)
    await businessRepository.save(business)
    return res.json(business)
  }
}
