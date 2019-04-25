import Exception from './Exception'

export default class NotFoundException extends Exception {
  public constructor (message: string = 'Resource not found') {
    super(404, 'not-found-exception', message)
  }
}
