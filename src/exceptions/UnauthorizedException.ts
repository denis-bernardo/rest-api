import Exception from './Exception'

export default class UnauthorizedException extends Exception {
  public constructor (message: string) {
    super(401, 'unauthorized-exception', message)
  }
}
