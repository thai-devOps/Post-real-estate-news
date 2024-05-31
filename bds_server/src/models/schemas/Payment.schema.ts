import { ObjectId } from 'mongodb'
import { PAYMENT_METHOD, PAYMENT_STATUS } from '~/enums/util.enum'

interface PaymentType {
  _id?: ObjectId
  user_id: ObjectId
  package_id: ObjectId
  payment_method: PAYMENT_METHOD // paypal, stripe, vnPay
  is_paid: boolean
  status?: PAYMENT_STATUS
  payment_time?: Date
  created_at?: Date
  updated_at?: Date
}
export class PAYMENT_SCHEMA {
  _id: ObjectId
  user_id: ObjectId
  package_id: ObjectId
  payment_method: PAYMENT_METHOD
  is_paid: boolean
  status: PAYMENT_STATUS
  payment_time: Date
  created_at: Date
  updated_at: Date
  constructor(data: PaymentType) {
    const date = new Date()
    this._id = data._id || new ObjectId()
    this.user_id = data.user_id
    this.package_id = data.package_id
    this.payment_method = data.payment_method
    this.is_paid = data.is_paid
    this.status = data.status || PAYMENT_STATUS.PENDING
    this.payment_time = data.payment_time || date
    this.created_at = data.created_at || date
    this.updated_at = data.updated_at || date
  }
}
