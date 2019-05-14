// eslint-disable-next-line no-unused-vars
import IAuthUser from '../interfaces/IAuthUser'
// eslint-disable-next-line no-unused-vars
import Business from '../models/Business'

declare global {
  namespace Express {
    interface Request {
      user: any
      business: Business
    }
  }
}
