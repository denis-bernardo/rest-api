import { EntityRepository } from 'typeorm'
import Business from '../models/Business'
import BaseRepository from './BaseRepository'

@EntityRepository(Business)
export default class BusinessRepository extends BaseRepository<Business> {

}
