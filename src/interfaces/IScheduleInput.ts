export interface IScheduleInput {
  scheduledTo: string
  weekDay: number
  startAt: string
  endAt: string
  note?: string
  professionalId: string
  customerId?: string
  block?: boolean
  services?: string[]
  businessId?: string
}
