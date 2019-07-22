export default interface IAuthUser {
  email: string
  id: string
  businesses: string[]
  business: string
  permissions: object
  professionalId: string
  isAdmin: boolean
}
