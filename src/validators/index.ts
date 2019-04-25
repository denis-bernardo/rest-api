import * as Joi from 'joi'
import ValidationException from '../exceptions/ValidationException'
import IDummyObject from '../interfaces/IDummyObject'
import language from './languages'

export const validator = (data: object, schema: Joi.ObjectSchema, options?: Joi.ValidationOptions): IDummyObject => {
  const defaultOptions: Joi.ValidationOptions = {
    abortEarly: false,
    stripUnknown: { objects: true },
    language: language['pt-BR']
  }

  const { error, value } = schema.validate(data, Object.assign(defaultOptions, options))

  if (error) {
    const errorDetails = error.details.reduce((accumulate: IDummyObject, err: Joi.ValidationErrorItem) => {
      if (err.context && err.context.key) {
        accumulate[err.context.key] = err.message
      }

      return accumulate
    }, {})

    throw new ValidationException(errorDetails)
  }

  return value
}

export const getRuleRequired = (rule: any, isRequired: boolean) => {
  if (isRequired) {
    return rule.required()
  }

  return rule
}
