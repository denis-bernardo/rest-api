import Exception from './Exception'

export default class ForbiddenException extends Exception {
  public constructor (message: string) {
    super(403, 'forbidden-exception', message)
  }
}
