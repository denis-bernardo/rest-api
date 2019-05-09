import { EntityRepository } from 'typeorm'
import Service from '../models/Service'
import BaseRepository from './BaseRepository'

@EntityRepository(Service)
export default class ServiceRepository extends BaseRepository<Service> {

}
