import Exception from './Exception'

export default class ValidationException extends Exception {
  public constructor (err: any) {
    super(422, 'validation-exception', 'There are validation errors')

    this.body.validationErrors = err
  }
}
