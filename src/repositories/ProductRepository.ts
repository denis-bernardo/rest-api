import { EntityRepository } from 'typeorm'
import Product from '../models/Product'
import BaseRepository from './BaseRepository'

@EntityRepository(Product)
export default class ProductRepository extends BaseRepository<Product> {

}
