import * as Joi from 'joi'
import { getRuleOptional } from '../index'

class SetupValidator {
  public validateCreation () {
    return Joi.object({
      body: this.getSchema()
    })
  }

  private getSchema () {
    return Joi.object({
      business: Joi.object({
        name: Joi.string().required(),
        phoneNumber: getRuleOptional(Joi.string()),
        landlineNumber: getRuleOptional(Joi.string()),
        email: getRuleOptional(Joi.string().email()),
        description: getRuleOptional(Joi.string().max(500)),
        businessTypeId: Joi.number().required(),
        planId: Joi.number().required(),
        image: getRuleOptional(Joi.string().uri()),
        address: Joi.object({
          street: Joi.string().required(),
          number: Joi.string().required(),
          neighborhood: getRuleOptional(Joi.string()),
          complement: getRuleOptional(Joi.string()),
          city: Joi.string().required(),
          state: Joi.string().max(2).required(),
          country: getRuleOptional(Joi.string()),
          zipCode: Joi.string().required()
        }).required(),
        social: Joi.object({
          website: getRuleOptional(Joi.string()),
          instagram: getRuleOptional(Joi.string()),
          facebook: getRuleOptional(Joi.string()),
          twitter: getRuleOptional(Joi.string())
        }),
        info: Joi.object({
          acceptCreditCard: Joi.boolean(),
          acceptDebitCard: Joi.boolean(),
          hasParking: Joi.boolean(),
          hasWifi: Joi.boolean(),
          accessbility: Joi.boolean(),
          supportChildren: Joi.boolean()
        }),
        hours: Joi.array().items(Joi.object({
          weekDay: Joi.number().required(),
          open: Joi.string(),
          closed: Joi.string()
        }))
      }).required(),
      services: Joi.array().items(Joi.object({
        id: getRuleOptional(Joi.string()),
        name: Joi.string().required(),
        serviceCategoryId: Joi.number().required(),
        ref: Joi.string(),
        details: Joi.object({
          price: Joi.number().required(),
          duration: Joi.number().required(),
          scheduling: Joi.boolean()
        })
      })),
      professionals: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        nickname: Joi.string().allow('').optional(),
        user: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
          userGroupId: Joi.number().required()
        }).required(),
        hours: Joi.array().items(Joi.object({
          weekDay: Joi.number().required(),
          startAt: Joi.string().required(),
          endAt: Joi.string().required()
        })),
        services: Joi.array().items(Joi.string())
      }))
    })
  }
}

export default new SetupValidator()
