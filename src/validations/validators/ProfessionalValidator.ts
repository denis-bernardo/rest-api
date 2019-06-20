import * as Joi from 'joi'
import { getRuleRequired, getRuleOptional } from '../index'

class ProfessionalValidator {
  public validate (isCreate = true) {
    return Joi.object({
      body: this.getSchema(isCreate)
    })
  }

  private getSchema (isCreate: boolean) {
    return Joi.object({
      name: getRuleRequired(Joi.string(), isCreate),
      nickname: getRuleOptional(Joi.string()),
      gender: getRuleOptional(Joi.string().valid(['M', 'F'])),
      birthDate: getRuleOptional(Joi.date()),
      document: getRuleOptional(Joi.string()),
      phoneNumber: getRuleOptional(Joi.string()),
      landlineNumber: getRuleOptional(Joi.string()),
      hours: Joi.array().items(Joi.object({
        weekDay: Joi.number().min(0).max(6).required(),
        startAt: Joi.string().required(),
        endAt: Joi.string().required()
      })),
      services: Joi.array().items(Joi.string()),
      user: getRuleRequired(Joi.object({
        cognitoUserSub: getRuleRequired(Joi.string(), isCreate),
        userGroupId: getRuleRequired(Joi.number(), isCreate)
      }), isCreate)
    })
  }
}

export default new ProfessionalValidator()
