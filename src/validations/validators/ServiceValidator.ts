import * as Joi from 'joi'

class ServiceValidator {
  public validateCreation () {
    return Joi.object({
      body: this.getSchemaCreate()
    })
  }

  public validateUpdate () {
    return Joi.object({
      body: this.getSchemaUpdate()
    })
  }

  private getSchemaUpdate () {
    return Joi.object({
      name: Joi.string(),
      serviceCategoryId: Joi.number(),
      details: Joi.object({
        id: Joi.number().required(),
        price: Joi.number(),
        duration: Joi.number(),
        scheduling: Joi.boolean()
      })
    })
  }

  private getSchemaCreate () {
    return Joi.object({
      name: Joi.string().required(),
      serviceCategoryId: Joi.number().required(),
      details: Joi.object({
        price: Joi.number().required(),
        duration: Joi.number().required(),
        scheduling: Joi.boolean()
      }).required()
    })
  }
}

export default new ServiceValidator()
