import { NextFunction, Request, Response } from 'express'
import * as Joi from 'joi'
import { validator } from '../validators'

const validate = (schema: Joi.ObjectSchema, options?: Joi.ValidationOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body, params, headers } = validator(req, schema, options)

    req.body = body || req.body
    req.params = params || req.params
    req.headers = headers || req.headers

    next()
  }
}

export default validate
