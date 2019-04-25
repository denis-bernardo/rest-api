import Exception from './Exception'

export default class InvalidException extends Exception {
  public constructor (message: string) {
    super(400, 'invalid-exception', message)
  }
}
