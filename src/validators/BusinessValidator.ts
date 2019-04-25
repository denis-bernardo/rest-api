import * as Joi from 'joi'
import { getRuleRequired } from './index'

class BusinessValidator {
  public validateCreation () {
    return Joi.object({
      body: this.getSchema()
    })
  }

  public validateUpdate () {
    return Joi.object({
      body: this.getSchema(false)
    })
  }

  private getSchema (isCreate = true) {
    return Joi.object({
      name: getRuleRequired(Joi.string(), isCreate),
      companyName: Joi.string(),
      phoneNumber: Joi.string(),
      landlineNumber: Joi.string(),
      email: Joi.string().email(),
      image: Joi.string().uri(),
      ie: Joi.string().allow('').optional(),
      description: Joi.string(),
      deactivatedAt: Joi.date(),
      businessTypeId: getRuleRequired(Joi.number(), isCreate),
      planId: getRuleRequired(Joi.number(), isCreate),
      address: Joi.object()
    })
  }
}

export default new BusinessValidator()
