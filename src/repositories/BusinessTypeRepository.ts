import { EntityRepository, Repository } from 'typeorm'
import BusinessType from '../models/BusinessType'

@EntityRepository(BusinessType)
export default class BusinessTypeRepository extends Repository<BusinessType> {

}
