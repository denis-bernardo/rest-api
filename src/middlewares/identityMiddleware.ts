import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import BusinessRepository from '../repositories/BusinessRepository'
import NotFoundException from '../exceptions/NotFoundException'
import asyncFn from './asyncMiddleware'

const identityMiddleware = asyncFn(async (req: Request, res: Response, next: NextFunction) => {
  req.user = {
    email: 'user@example.com',
    id: '79890d48-da0b-4ef8-88ae-de77b0ea68f2',
    businesses: ['485d98db-29eb-4c6b-b7d4-0f78f165bcf7']
  }

  if (req.headers['x-business-id']) {
    const businessRepository = getCustomRepository(BusinessRepository)
    const business = await businessRepository.findOne({ where: { id: req.headers['x-business-id'] } })

    if (!business) {
      throw new NotFoundException('business não encontrado')
    }

    req.business = business
  }

  next()
})

export default identityMiddleware
