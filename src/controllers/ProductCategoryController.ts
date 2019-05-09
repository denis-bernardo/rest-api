import { Request, Response } from 'express'
import ProductCategoryRepository from '../repositories/ProductCategoryRepository'
import { getCustomRepository } from 'typeorm'
import NotFoundException from '../exceptions/NotFoundException'

export default class ProductCategoryController {
  public async list (req: Request, res: Response) {
    const productCategoryRepository = getCustomRepository(ProductCategoryRepository)
    const response = await productCategoryRepository.paginate(req.query.page, req.query.limit, {
      order: { createdAt: 'DESC' },
      where: [
        { business: { id: req.business.id } }
      ]
    })
    return res.json(response)
  }

  public async create (req: Request, res: Response) {
    const productCategoryRepository = getCustomRepository(ProductCategoryRepository)

    const productCategory = productCategoryRepository.create({
      ...req.body,
      business: req.business
    })

    await productCategoryRepository.save(productCategory)
    return res.status(201).json(productCategory)
  }

  public async show (req: Request, res: Response) {
    const productCategoryRepository = getCustomRepository(ProductCategoryRepository)
    const productCategory = await productCategoryRepository.findOne({
      where: { id: req.params.id, business: req.business }
    })

    if (!productCategory) {
      throw new NotFoundException('Categoria do produto não encontrada')
    }

    return res.json(productCategory)
  }

  public async update (req: Request, res: Response) {
    const id = req.params.id
    const productCategoryRepository = getCustomRepository(ProductCategoryRepository)
    const productCategory = await productCategoryRepository.findOne(id)

    if (!productCategory) {
      throw new NotFoundException('Categoria do produto não encontrada')
    }

    const productCategoryEntity = productCategoryRepository.create({
      ...req.body,
      id: Number(id),
      business: req.business
    })

    await productCategoryRepository.save(productCategoryEntity)
    return res.json(productCategoryEntity)
  }

  public async destroy (req: Request, res: Response) {
    const productCategoryRepository = getCustomRepository(ProductCategoryRepository)
    const productCategory = await productCategoryRepository.findOne({ where: { id: req.params.id, business: req.business } })

    if (!productCategory) {
      throw new NotFoundException('Categoria do produto não encontrada')
    }

    await productCategoryRepository.remove(productCategory)
    return res.status(204).send()
  }
}
