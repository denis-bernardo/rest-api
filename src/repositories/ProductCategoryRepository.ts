import { EntityRepository } from 'typeorm'
import BaseRepository from './BaseRepository'
import ProductCategory from '../models/ProductCategory'

@EntityRepository(ProductCategory)
export default class ProductCategoryRepository extends BaseRepository<ProductCategory> {

}
