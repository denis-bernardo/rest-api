import { EntityRepository } from 'typeorm'
import OrderStatus from '../models/OrderStatus'
import BaseRepository from './BaseRepository'

@EntityRepository(OrderStatus)
export default class OrderStatusRepository extends BaseRepository<OrderStatus> {

}
