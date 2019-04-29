import Exception from './Exception'

export default class ConflictException extends Exception {
  public constructor (message = 'Resource already exists') {
    super(409, 'conflict-exception', message)
  }
}
