import { ObjectId } from 'mongodb'
import { VIP_STATUS } from '~/enums/util.enum'

interface VipUserDetailType {
  _id?: ObjectId
  user_id: ObjectId
  package_id: ObjectId
  start_time: Date
  end_time: Date
  created_at?: Date
  updated_at?: Date
  number_of_posting_used: number
  status?: VIP_STATUS
  current_active?: boolean
}
export class VIP_USER_DETAIL_SCHEMA {
  _id: ObjectId
  user_id: ObjectId
  package_id: ObjectId
  start_time: Date
  end_time: Date
  created_at: Date
  updated_at: Date
  number_of_posting_used: number
  status: VIP_STATUS
  current_active: boolean
  constructor(data: VipUserDetailType) {
    const date = new Date()
    this._id = data._id || new ObjectId()
    this.user_id = data.user_id
    this.package_id = data.package_id
    this.start_time = data.start_time
    this.end_time = data.end_time
    this.created_at = data.created_at || date
    this.updated_at = data.updated_at || date
    this.number_of_posting_used = data.number_of_posting_used
    this.current_active = data.current_active || true
    this.status = data.status || VIP_STATUS.ACTIVE
  }
}
