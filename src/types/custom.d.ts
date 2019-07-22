/* eslint-disable no-unused-vars */
import IAuthUser from '../interfaces/IAuthUser'
import Business from '../models/Business'

declare global {
  namespace Express {
    interface Request {
      user: IAuthUser
      business: Business
    }
  }
}
