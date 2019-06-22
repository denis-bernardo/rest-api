import * as Joi from 'joi'
import { getRuleRequired, getRuleOptional } from '../index'

class CustomerValidator {
  public validate (isCreate = true) {
    return Joi.object({
      body: this.getSchema(isCreate)
    })
  }

  private getSchema (isCreate: boolean) {
    return Joi.object({
      name: getRuleRequired(Joi.string(), isCreate),
      gender: getRuleOptional(Joi.string().valid(['M', 'F'])),
      birthDate: getRuleOptional(Joi.date()),
      phoneNumber: getRuleOptional(Joi.string()),
      user: Joi.object({
        cognitoUserSub: getRuleRequired(Joi.string(), isCreate),
        userGroupId: getRuleRequired(Joi.number(), isCreate)
      }),
      address: Joi.object({
        street: Joi.string(),
        number: Joi.string(),
        neighborhood: Joi.string(),
        complement: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        country: Joi.string(),
        zipCode: Joi.string()
      })
    })
  }
}

export default new CustomerValidator()
