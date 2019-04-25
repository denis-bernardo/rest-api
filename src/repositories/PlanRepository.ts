import { EntityRepository, Repository } from 'typeorm'
import Plan from '../models/Plan'

@EntityRepository(Plan)
export default class PlanRepository extends Repository<Plan> {

}
