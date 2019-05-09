import { EntityRepository } from 'typeorm'
import ProductBrand from '../models/ProductBrand'
import BaseRepository from './BaseRepository'

@EntityRepository(ProductBrand)
export default class ProductBrandRepository extends BaseRepository<ProductBrand> {

}
