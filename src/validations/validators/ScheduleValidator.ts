import * as Joi from 'joi'
import { getRuleOptional, getRuleRequired } from '..'

class ScheduleValidator {
  public validate (isCreate = true) {
    return Joi.object({
      body: this.getSchema(isCreate)
    })
  }

  private getSchema (isCreate: boolean) {
    return Joi.object({
      scheduledTo: getRuleRequired(Joi.string(), isCreate),
      weekDay: getRuleRequired(Joi.number(), isCreate),
      startAt: getRuleRequired(Joi.string(), isCreate),
      endAt: getRuleRequired(Joi.string(), isCreate),
      note: getRuleOptional(Joi.string()),
      professionalId: getRuleRequired(Joi.string(), isCreate),
      customerId: getRuleOptional(Joi.string()),
      block: getRuleOptional(Joi.boolean()),
      services: getRuleOptional(Joi.array().items(Joi.string())),
      businessId: getRuleOptional(Joi.string())
    })
  }
}

export default new ScheduleValidator()
