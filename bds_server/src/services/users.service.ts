import { LoginRequest, RegisterRequest } from '~/models/requests/common.request'
import databaseService from './database.service'
import { USER_SCHEMA } from '~/models/schemas/User.schema'
import hashPassword from '~/utils/crypto'
import { ObjectId } from 'mongodb'
import JwtModule from '~/utils/jwt'
import { ErrorWithMessage } from '~/utils/error'
import { omit } from 'lodash'
import { USER_VERIFY_STATUS } from '~/enums/user.enum'
import { TokenPayload } from '~/type'
import refreshTokenService from './refresh_tokens.service'
import { sendEmailResetPassword } from '~/utils/email'
import { UserProfile } from '~/models/requests/users.request'

class UserService {
  async createAccount(payload: RegisterRequest) {
    return databaseService.users.insertOne(
      new USER_SCHEMA({
        ...payload,
        password: hashPassword(payload.password)
      })
    )
  }
  // find existed email in database
  async findExistedEmail(email: string) {
    return databaseService.users.findOne({ email })
  }
  async getUserById(id: string) {
    return databaseService.users.findOne({ _id: new ObjectId(id) })
  }
  async updateEmailVerifyToken(id: string, token: string) {
    return databaseService.users.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { email_verify_token: token, updated_at: new Date() } },
      { returnDocument: 'after' }
    )
  }
  async login(payload: LoginRequest) {
    const user = (await this.findExistedEmail(payload.email)) as USER_SCHEMA
    if (!user) throw new ErrorWithMessage({ message: 'Không tìm thấy email', status: 401 })
    if (user.verify === USER_VERIFY_STATUS.BLOCKED) {
      throw new ErrorWithMessage({ message: 'Tài khoản đã bị khóa', status: 403 })
    }
    if (user.verify === USER_VERIFY_STATUS.UNVERIFIED) {
      return {
        user: omit(user, ['password']),
        access_token: null,
        refresh_token: null
      }
    }
    const result = await Promise.all([
      JwtModule.signAcessToken({
        user_id: user._id.toString(),
        account_type: user.account_type,
        role: user.role,
        verify: user.verify
      }),
      JwtModule.signRefreshToken({
        user_id: user._id.toString(),
        account_type: user.account_type,
        role: user.role,
        verify: user.verify
      })
    ])
    return {
      user: omit(user, ['password']),
      access_token: result[0],
      refresh_token: result[1]
    }
  }
  async refreshAccessToken(refresh_token: string, decoded_refresh_token: TokenPayload) {
    const user = await this.getUserById(decoded_refresh_token.user_id)
    if (!user) throw new ErrorWithMessage({ message: 'Không tìm thấy user', status: 404 })
    const [n_at, n_rt, _] = await Promise.all([
      JwtModule.signAcessToken({
        user_id: user._id.toString(),
        account_type: user.account_type,
        role: user.role,
        verify: user.verify
      }),
      JwtModule.signRefreshToken({
        user_id: user._id.toString(),
        account_type: user.account_type,
        role: user.role,
        verify: user.verify,
        exp: decoded_refresh_token.exp
      }),
      refreshTokenService.deleteToken(refresh_token)
    ])
    await refreshTokenService.createRefreshToken(user._id.toString(), n_rt)
    return {
      user: omit(user, ['password']),
      access_token: n_at,
      refresh_token: n_rt
    }
  }
  async updateEmailVerified(id: string) {
    return databaseService.users.findOneAndUpdate(
      {
        _id: new ObjectId(id)
      },
      {
        $set: {
          verify: USER_VERIFY_STATUS.VERIFIED,
          email_verify_token: '',
          updated_at: new Date()
        }
      },
      {
        returnDocument: 'after'
      }
    )
  }
  async verifiedEmail(token: TokenPayload) {
    const user = await this.getUserById(token.user_id)
    if (!user) throw new ErrorWithMessage({ message: 'Không tìm thấy user', status: 404 })
    if (user.verify === USER_VERIFY_STATUS.VERIFIED) {
      throw new ErrorWithMessage({ message: 'Email đã được xác thực', status: 400 })
    }
    return await this.updateEmailVerified(user._id.toString())
  }
  async resendEmailVerification(id: string) {
    const user = await this.getUserById(id)
    if (!user) throw new ErrorWithMessage({ message: 'Không tìm thấy user', status: 404 })
    if (user.verify === USER_VERIFY_STATUS.VERIFIED) return null
    const token = await JwtModule.signEmailVerifyToken({
      user_id: user._id.toString(),
      verify: user.verify,
      role: user.role,
      account_type: user.account_type
    })
    return await this.updateEmailVerifyToken(user._id.toString(), token)
  }
  public async forgotPassword(user: USER_SCHEMA) {
    const token = await JwtModule.signForgotPasswordToken({
      account_type: user.account_type,
      role: user.role,
      user_id: user._id.toString(),
      verify: user.verify
    })
    const result = await sendEmailResetPassword({
      email: user.email,
      token,
      account_type: user.account_type,
      role: user.role,
      subject: 'Đặt lại mật khẩu'
    })
    return await databaseService.users.findOneAndUpdate(
      { _id: new ObjectId(user._id) },
      { $set: { forgot_password_token: token, updated_at: new Date() } },
      { returnDocument: 'after' }
    )
  }
  async resetPassword(id: string, n_password: string) {
    return databaseService.users.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { password: hashPassword(n_password), forgot_password_token: '', updated_at: new Date() } },
      { returnDocument: 'after' }
    )
  }
  async changePassword(id: string, n_password: string) {
    const user = await this.getUserById(id)
    if (!user) throw new ErrorWithMessage({ message: 'Không tìm thấy user', status: 404 })
    return databaseService.users.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { password: hashPassword(n_password), updated_at: new Date() } },
      { returnDocument: 'after' }
    )
  }
  public async findUserById(id: string) {
    return databaseService.users.findOne({ _id: new ObjectId(id) })
  }
  async updateProfile(id: string, payload: UserProfile) {
    return databaseService.users.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...payload, updated_at: new Date() } },
      { returnDocument: 'after' }
    )
  }
  async blockPost(id: string, post_id: string) {
    return databaseService.users.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $push: { blocked_posts: new ObjectId(post_id) }, $set: { updated_at: new Date() } },
      { returnDocument: 'after' }
    )
  }
  async unblockPost(id: string, post_id: string) {
    return databaseService.users.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $pull: { blocked_posts: new ObjectId(post_id) }, $set: { updated_at: new Date() } },
      { returnDocument: 'after' }
    )
  }
}

const userService = new UserService()
export default userService
