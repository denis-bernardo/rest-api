import { EntityRepository } from 'typeorm'
import Payment from '../models/Payment'
import BaseRepository from './BaseRepository'

@EntityRepository(Payment)
export default class PaymentRepository extends BaseRepository<Payment> {

}
