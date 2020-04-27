export interface IOrderOptions {
  note?: string
  amount: number
  amountReceived?: number
  orderStatusId: number
  paymentId?: number
  professionalId?: string
  customerId?: string
  cashierId?: string
  scheduleId?: string
  items: IOrderItemOptions[]
}

interface IOrderItemOptions {
  name: string
  quantity: number
  price: number
  discount: number
  isTip?: boolean
  productId?: number
  serviceId?: string
}
