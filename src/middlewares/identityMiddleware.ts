import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import BusinessRepository from '../repositories/BusinessRepository'
import NotFoundException from '../exceptions/NotFoundException'
import asyncFn from './asyncMiddleware'

const identityMiddleware = asyncFn(async (req: Request, res: Response, next: NextFunction) => {
  if (req.user['cognito:custom:business']) {
    const businessRepository = getCustomRepository(BusinessRepository)
    const business = await businessRepository.findOne({ where: { id: req.user['cognito:custom:business'] } })

    if (!business) {
      throw new NotFoundException('business não encontrado')
    }

    req.business = business
  }

  next()
})

export default identityMiddleware
