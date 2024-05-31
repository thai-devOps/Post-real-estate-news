import { VIP_USER_DETAIL_REQUEST_BODY } from '~/models/requests/vip_user_detail.request'
import databaseService from './database.service'
import { VIP_USER_DETAIL_SCHEMA } from '~/models/schemas/VipUserDetail.schema'
import { ObjectId } from 'mongodb'

class VipUserDetailsService {
  async create(payload: VIP_USER_DETAIL_REQUEST_BODY) {
    return await databaseService.vip_user_details.insertOne(
      new VIP_USER_DETAIL_SCHEMA({
        ...payload,
        package_id: new ObjectId(payload.package_id),
        user_id: new ObjectId(payload.user_id)
      })
    )
  }
  public async getAll() {
    return await databaseService.vip_user_details.find().toArray()
  }
  public async getById(id: string) {
    return await databaseService.vip_user_details.findOne({ _id: new ObjectId(id), current_active: true })
  }
  public async update(id: string, payload: VIP_USER_DETAIL_REQUEST_BODY) {
    return await databaseService.vip_user_details.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...payload,
          user_id: new ObjectId(payload.user_id),
          package_id: new ObjectId(payload.package_id)
        }
      },
      { returnDocument: 'after' }
    )
  }
}
const vipUserDetailsService = new VipUserDetailsService()
export default vipUserDetailsService
