import { ACCOUNT_TYPE, ROLE_TYPE, USER_VERIFY_STATUS } from './enums/user.enum'
import { TOKEN_TYPE } from ' ~/enums/util.enum'
import { USER_SCHEMA } from './models/schemas/User.schema'
import { JwtPayload } from 'jsonwebtoken'
declare module 'express' {
  interface Request {
    user?: USER_SCHEMA
    decoded_access_token?: TokenPayload
    decoded_refresh_token?: TokenPayload
    decoded_email_verify_token?: TokenPayload
    decoded_forgot_password_token?: TokenPayload
  }
}

interface ImageTypes {
  public_id: string
  url: string
}
interface AddressTypes {
  details: string
  street: string
  province: string
  district: string
  ward: string
}
interface SuccessResponse<T> {
  message: string
  data: T
}
interface TokenPayload extends JwtPayload {
  user_id: string
  role: ROLE_TYPE
  verify: USER_VERIFY_STATUS
  token_type: TOKEN_TYPE
  account_type: ACCOUNT_TYPE
  iat: number
  exp: number
}
