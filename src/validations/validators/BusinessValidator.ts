import * as Joi from 'joi'
import { getRuleRequired, getRuleOptional } from '../index'

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
      companyName: getRuleOptional(Joi.string()),
      phoneNumber: getRuleOptional(Joi.string()),
      landlineNumber: getRuleOptional(Joi.string()),
      email: getRuleOptional(Joi.string().email()),
      image: getRuleOptional(Joi.string().uri()),
      ie: getRuleOptional(Joi.string()),
      description: getRuleOptional(Joi.string().max(500)),
      deactivatedAt: Joi.date(),
      businessTypeId: getRuleRequired(Joi.number(), isCreate),
      planId: getRuleRequired(Joi.number(), isCreate),
      address: Joi.object()
    })
  }
}

export default new BusinessValidator()
