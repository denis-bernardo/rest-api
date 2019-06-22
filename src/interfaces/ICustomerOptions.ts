import { IUserOptions } from './IUserOptions'
import { IAddressOptions } from './IAddressOptions'

export interface ICustomerOptions {
  name: string
  gender?: string
  birthDate?: string
  phoneNumber?: string
  user?: IUserOptions
  address?: IAddressOptions
}
