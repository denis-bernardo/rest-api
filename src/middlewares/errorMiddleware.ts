import { Request, Response } from 'express'
import Exception from '../exceptions/Exception'
import InternalException from '../exceptions/InternalException'
import IDummyObject from '../interfaces/IDummyObject'
import { NextFunction } from 'connect'

const normalizeError = (err: Error & IDummyObject) => {
  if (err instanceof Exception) {
    return err
  }

  return new InternalException(err.message)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error((err as any))

  const error = normalizeError(err)

  return res.status(error.getStatusCode()).json(error.getBody())
}

export default errorHandler
