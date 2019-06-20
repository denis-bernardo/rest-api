export interface IProfessionalOptions {
  name: string
  nickname?: string
  gender: string
  birthDate: string
  document: string
  phoneNumber: string
  landlineNumber: string
  user: IUser
  hours: IProfessionalHours[]
  services: string[]
}

interface IProfessionalHours {
  weekDay: number
  startAt: string
  endAt: string
}

interface IUser {
  cognitoUserSub: string
  userGroupId: number
}
