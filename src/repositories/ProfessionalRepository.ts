import { EntityRepository } from 'typeorm'
import Professional from '../models/Professional'
import BaseRepository from './BaseRepository'

@EntityRepository(Professional)
export default class ProfessionalRepository extends BaseRepository<Professional> {

}
