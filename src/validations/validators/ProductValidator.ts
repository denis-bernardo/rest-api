import * as Joi from 'joi'
import { getRuleRequired, getRuleOptional } from '../index'

class ProductValidator {
  public validateProduct (isCreate = true) {
    return Joi.object({
      body: this.getSchemaProduct(isCreate)
    })
  }

  public validateCategory (isCreate = true) {
    return Joi.object({
      body: this.getSchemaCategory(isCreate)
    })
  }

  public validateBrand (isCreate = true) {
    return Joi.object({
      body: this.getSchemaBrand(isCreate)
    })
  }

  private getSchemaProduct (isCreate: boolean) {
    return Joi.object({
      name: getRuleRequired(Joi.string(), isCreate),
      description: getRuleOptional(Joi.string()),
      price: getRuleRequired(Joi.number(), isCreate),
      image: getRuleOptional(Joi.string().uri()),
      quantity: getRuleRequired(Joi.number(), isCreate),
      productCategoryId: getRuleRequired(Joi.number(), isCreate),
      productBrandId: getRuleRequired(Joi.number(), isCreate)
    })
  }

  private getSchemaCategory (isCreate: boolean) {
    return Joi.object({
      name: getRuleRequired(Joi.string(), isCreate)
    })
  }

  private getSchemaBrand (isCreate: boolean) {
    return Joi.object({
      name: getRuleRequired(Joi.string(), isCreate)
    })
  }
}

export default new ProductValidator()
