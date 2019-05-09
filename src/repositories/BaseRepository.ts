import { Repository, FindOneOptions } from 'typeorm'

export default class BaseRepository<T> extends Repository<T> {
  public async paginate (page = 1, limit = 30, options?: FindOneOptions<T>) {
    const take = limit
    const skip = limit * (page - 1)

    const [result, total] = await this.findAndCount({
      ...options,
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
