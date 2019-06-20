interface IBusiness {
  name: string
  phoneNumber?: string
  landlineNumber?: string
  email?: string
  description?: string
  businessTypeId: number
  planId: number
  image?: string
  address: IAddress
  social: IBusinessSocial,
  info: IBusinessInfo,
  hours: IBusinessHours[]
}

interface IAddress {
  street: string
  number: string
  neighborhood?: string
  complement?: string
  city: string
  state: string
  country?: string
  zipCode: string
}

interface IBusinessSocial {
  website?: string
  instagram?: string
  facebook?: string
  twitter?: string
}

interface IBusinessInfo {
  acceptCreditCard: boolean
  acceptDebitCard: boolean
  hasParking: boolean
  hasWifi: boolean
  accessbility: boolean
  supportChildren: boolean
}

interface IBusinessHours {
  weekDay: number
  open?: string
  closed?: string
}

interface IService {
  id?: string
  name: string
  serviceCategoryId: number
  ref?: string
  details: IServiceDetail
}

interface IServiceDetail {
  price: number
  duration: number
  scheduling: boolean
}

interface IProfessional {
  name: string
  nickname?: string
  user: IUser
  hours: IProfessionalHours[],
  services: string[]
}

interface IProfessionalHours {
  weekDay: number
  startAt: string
  endAt: string
}

export interface IUser {
  cognitoUserSub: string
  userGroupId: number
}

export interface ISetupOptions {
  business: IBusiness
  services: IService[]
  professionals: IProfessional[]
}

export interface IServicesRef {
  serviceId: string
  ref: string
}
