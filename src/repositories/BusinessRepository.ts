import { EntityRepository, Repository } from 'typeorm'
import Business from '../models/Business'

@EntityRepository(Business)
export default class BusinessRepository extends Repository<Business> {
  public async paginate (page = 1, limit = 30) {
    const take = limit
    const skip = limit * (page - 1)

    const [result, total] = await this.findAndCount({
      order: { createdAt: 'DESC' },
      take: take,
      skip: skip
    })

    return {
      data: result,
      count: total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page)
    }
  }
}
