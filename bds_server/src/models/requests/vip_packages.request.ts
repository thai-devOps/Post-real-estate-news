import { DISCOUNT_TYPE } from '~/enums/util.enum'

export interface VIP_PACKAGE_REQUEST_BODY {
  name: string
  price: number
  duration: number // in days
  description: string
  postingLimit: number
  discount: {
    type: DISCOUNT_TYPE
    value: number
    status: boolean
  }
  topTrending: boolean
  commentRight: boolean
  newsExistTime: number
}
