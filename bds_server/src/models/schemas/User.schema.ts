import { ObjectId } from 'mongodb'
import { ACCOUNT_TYPE, ROLE_TYPE, USER_VERIFY_STATUS } from '~/enums/user.enum'
import { ImageTypes, AddressTypes } from '~/type'
interface UserTypes {
  _id?: ObjectId
  full_name: string
  phone?: string
  email: string
  password: string
  role?: ROLE_TYPE
  account_type: ACCOUNT_TYPE
  verify?: USER_VERIFY_STATUS
  date_of_birth?: string // ISO8601 string
  avartar?: ImageTypes
  // Optional fields
  address?: AddressTypes
  forgot_password_token?: string
  email_verify_token?: string
  blocked_posts?: ObjectId[]
  created_at?: Date
  updated_at?: Date
}
export class USER_SCHEMA {
  _id: ObjectId
  full_name: string
  phone: string
  email: string
  password: string
  role: ROLE_TYPE
  verify: USER_VERIFY_STATUS
  account_type: ACCOUNT_TYPE
  date_of_birth: string // ISO8601 string
  avartar: ImageTypes
  // Optional fields
  address: AddressTypes
  forgot_password_token: string
  email_verify_token: string
  blocked_posts: ObjectId[]
  created_at?: Date
  updated_at?: Date

  // Constructor
  constructor(user: UserTypes) {
    const date = new Date()
    this._id = user._id || new ObjectId()
    this.full_name = user.full_name || ''
    this.phone = user.phone || ''
    this.email = user.email
    this.password = user.password
    this.role = user.role || ROLE_TYPE.USER
    this.verify = user.verify || USER_VERIFY_STATUS.UNVERIFIED
    this.account_type = user.account_type
    this.date_of_birth = user.date_of_birth || ''
    this.avartar = user.avartar || { public_id: '', url: '' }
    this.address = user.address || ({ details: '', street: '', province: '', district: '', ward: '' } as AddressTypes)
    this.forgot_password_token = user.forgot_password_token || ''
    this.email_verify_token = user.email_verify_token || ''
    this.blocked_posts = user.blocked_posts || []
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
  }
}
