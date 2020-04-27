import { EntityRepository } from 'typeorm'
import Order from '../models/Order'
import BaseRepository from './BaseRepository'

@EntityRepository(Order)
export default class OrderRepository extends BaseRepository<Order> {

}
