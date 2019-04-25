import { EntityRepository, Repository } from 'typeorm'
import Address from '../models/Address'

@EntityRepository(Address)
export default class AddressRepository extends Repository<Address> {

}
