import { Request, Response } from 'express'
import ProductRepository from '../repositories/ProductRepository'
import { getCustomRepository } from 'typeorm'
import ProductBrandRepository from '../repositories/ProductBrandRepository'
import ProductCategoryRepository from '../repositories/ProductCategoryRepository'
import NotFoundException from '../exceptions/NotFoundException'

export default class ProductController {
  public async list (req: Request, res: Response) {
    const productRepository = getCustomRepository(ProductRepository)
    const response = await productRepository.paginate(req.query.page, req.query.limit, {
      order: { createdAt: 'DESC' },
      where: [
        { business: { id: req.business.id } }
      ],
      relations: ['serviceDetails']
    })
    return res.json(response)
  }

  public async create (req: Request, res: Response) {
    const { productCategoryId, productBrandId, ...productData } = req.body
    const productRepository = getCustomRepository(ProductRepository)
    const productBrandRepository = getCustomRepository(ProductBrandRepository)
    const productCategoryRepository = getCustomRepository(ProductCategoryRepository)

    const productBrand = await productBrandRepository.findOne({
      where: { id: productBrandId, business: { id: req.business.id } }
    })

    if (!productBrand) {
      throw new NotFoundException('Marca do produto não encontrada')
    }

    const productCategory = await productCategoryRepository.findOne({
      where: { id: productCategoryId, business: { id: req.business.id } }
    })

    if (!productCategory) {
      throw new NotFoundException('Categoria do produto não encontrada')
    }

    const product = productRepository.create({
      ...productData,
      productBrand,
      productCategory,
      business: req.business
    })

    await productRepository.save(product)
    return res.status(201).json(product)
  }

  public async show (req: Request, res: Response) {
    const productRepository = getCustomRepository(ProductRepository)
    const product = await productRepository.findOne({
      where: { id: req.params.id, business: req.business },
      relations: ['productCategory', 'productBrand']
    })

    if (!product) {
      throw new NotFoundException('Produto não encontrado')
    }

    return res.json(product)
  }

  public async update (req: Request, res: Response) {
    const id = Number(req.params.id)
    const { productCategoryId, productBrandId, ...productData } = req.body
    const productRepository = getCustomRepository(ProductRepository)
    const productBrandRepository = getCustomRepository(ProductBrandRepository)
    const productCategoryRepository = getCustomRepository(ProductCategoryRepository)

    const product = await productRepository.findOne({
      where: { id, business: { id: req.business.id } }
    })

    if (!product) {
      throw new NotFoundException('Produto não encontrada')
    }

    const productBrand = await productBrandRepository.findOne({
      where: { id: productBrandId, business: { id: req.business.id } }
    })

    if (!productBrand) {
      throw new NotFoundException('Marca do produto não encontrada')
    }

    const productCategory = await productCategoryRepository.findOne({
      where: { id: productCategoryId, business: { id: req.business.id } }
    })

    if (!productCategory) {
      throw new NotFoundException('Categoria do produto não encontrada')
    }

    const productEntity = productRepository.create({
      ...productData,
      id,
      productBrand,
      productCategory,
      business: req.business
    })

    await productRepository.save(productEntity)
    return res.json(productEntity)
  }

  public async destroy (req: Request, res: Response) {
    const productRepository = getCustomRepository(ProductRepository)
    const product = await productRepository.findOne({
      where: { id: req.params.id, business: req.business }
    })

    if (!product) {
      throw new NotFoundException('Produto não encontrado')
    }

    await productRepository.remove(product)
    return res.status(204).send()
  }
}
