import { EntityRepository } from 'typeorm'
import Schedule from '../models/Schedule'
import BaseRepository from './BaseRepository'

@EntityRepository(Schedule)
export default class ScheduleRepository extends BaseRepository<Schedule> {

}
