import Exception from './Exception'

export default class InternalException extends Exception {
  public constructor (message = 'Ops! Something went wrong.') {
    super(500, 'internal-exception', message)
  }
}
