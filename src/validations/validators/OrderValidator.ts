import * as Joi from 'joi'
import { getRuleRequired, getRuleOptional } from '../index'

class OrderValidator {
  public validate (isCreate = true) {
    return Joi.object({
      body: this.getSchema(isCreate)
    })
  }

  private getSchema (isCreate: boolean) {
    return Joi.object({
      note: getRuleOptional(Joi.string()),
      amount: getRuleRequired(Joi.number(), isCreate),
      amountReceived: getRuleOptional(Joi.number()),
      orderStatusId: getRuleRequired(Joi.number(), isCreate),
      paymentId: getRuleOptional(Joi.number()),
      professionalId: getRuleOptional(Joi.string()),
      customerId: getRuleOptional(Joi.string()),
      cashierId: getRuleOptional(Joi.string()),
      scheduleId: getRuleOptional(Joi.string()),
      items: getRuleRequired(Joi.array().items(Joi.object({
        name: getRuleRequired(Joi.string(), isCreate),
        quantity: getRuleRequired(Joi.number(), isCreate),
        price: getRuleRequired(Joi.number(), isCreate),
        discount: getRuleOptional(Joi.number()),
        isTip: getRuleOptional(Joi.boolean()),
        productId: getRuleOptional(Joi.number()),
        serviceId: getRuleOptional(Joi.string())
      })), isCreate)
    })
  }
}

export default new OrderValidator()
