import { EntityRepository } from 'typeorm'
import ServiceCategory from '../models/ServiceCategory'
import BaseRepository from './BaseRepository'

@EntityRepository(ServiceCategory)
export default class ServiceCategoryRepository extends BaseRepository<ServiceCategory> {

}
