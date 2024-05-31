import { PAYMENT_METHOD } from '~/enums/util.enum'

export interface PAYMENT_REQUEST_BODY {
  package_id: string
  payment_method: PAYMENT_METHOD // paypal, stripe, vnPay
  is_paid: boolean
}
