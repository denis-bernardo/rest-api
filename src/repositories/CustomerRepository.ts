import { EntityRepository } from 'typeorm'
import Customer from '../models/Customer'
import BaseRepository from './BaseRepository'

@EntityRepository(Customer)
export default class CustomerRepository extends BaseRepository<Customer> {

}
