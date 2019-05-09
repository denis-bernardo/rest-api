import { EntityRepository } from 'typeorm'
import ServiceDetail from '../models/ServiceDetail'
import BaseRepository from './BaseRepository'

@EntityRepository(ServiceDetail)
export default class ServiceDetailRepository extends BaseRepository<ServiceDetail> {

}
