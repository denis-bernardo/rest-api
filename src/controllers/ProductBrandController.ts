import { Request, Response } from 'express'
import ProductBrandRepository from '../repositories/ProductBrandRepository'
import { getCustomRepository } from 'typeorm'
import NotFoundException from '../exceptions/NotFoundException'

export default class ProductBrandController {
  public async list (req: Request, res: Response) {
    const productBrandRepository = getCustomRepository(ProductBrandRepository)
    const response = await productBrandRepository.paginate(req.query.page, req.query.limit, {
      order: { createdAt: 'DESC' },
      where: [
        { business: { id: req.business.id } }
      ]
    })
    return res.json(response)
  }

  public async create (req: Request, res: Response) {
    const productBrandRepository = getCustomRepository(ProductBrandRepository)

    const productBrand = productBrandRepository.create({
      ...req.body,
      business: req.business
    })

    await productBrandRepository.save(productBrand)
    return res.status(201).json(productBrand)
  }

  public async show (req: Request, res: Response) {
    const productBrandRepository = getCustomRepository(ProductBrandRepository)
    const productBrand = await productBrandRepository.findOne({
      where: { id: req.params.id, business: req.business }
    })

    if (!productBrand) {
      throw new NotFoundException('Marca do produto não encontrada')
    }

    return res.json(productBrand)
  }

  public async update (req: Request, res: Response) {
    const id = req.params.id
    const productBrandRepository = getCustomRepository(ProductBrandRepository)
    const productBrand = await productBrandRepository.findOne(id)

    if (!productBrand) {
      throw new NotFoundException('Marca do produto não encontrada')
    }

    const productBrandEntity = productBrandRepository.create({
      ...req.body,
      id: Number(id),
      business: req.business
    })

    await productBrandRepository.save(productBrandEntity)
    return res.json(productBrandEntity)
  }

  public async destroy (req: Request, res: Response) {
    const productBrandRepository = getCustomRepository(ProductBrandRepository)
    const productBrand = await productBrandRepository.findOne({ where: { id: req.params.id, business: req.business } })

    if (!productBrand) {
      throw new NotFoundException('Marca do produto não encontrada')
    }

    await productBrandRepository.remove(productBrand)
    return res.status(204).send()
  }
}
