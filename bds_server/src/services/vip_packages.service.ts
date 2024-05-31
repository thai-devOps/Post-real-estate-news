import { VIP_PACKAGE_REQUEST_BODY } from '~/models/requests/vip_packages.request'
import databaseService from './database.service'
import { VIP_PACKAGE_SCHEMA } from '~/models/schemas/VipPackage.schema'
import { ObjectId } from 'mongodb'

class VipPackagesService {
  public async create(payload: VIP_PACKAGE_REQUEST_BODY) {
    return await databaseService.vip_packages.insertOne(new VIP_PACKAGE_SCHEMA(payload))
  }
  public async getAll() {
    return await databaseService.vip_packages.find().toArray()
  }
  public async getById(id: string) {
    return await databaseService.vip_packages.findOne({ _id: new ObjectId(id) })
  }
  public async update(id: string, payload: VIP_PACKAGE_REQUEST_BODY) {
    return await databaseService.vip_packages.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: payload },
      { returnDocument: 'after' }
    )
  }
  public async delete(id: string) {
    return await databaseService.vip_packages.findOneAndDelete({ _id: new ObjectId(id) })
  }
  public async getActiveVipPackages() {
    return await databaseService.vip_packages.find({ status: 'active' }).toArray()
  }
  public async getInactiveVipPackages() {
    return await databaseService.vip_packages.find({ status: 'inactive' }).toArray()
  }
  public async deleteAll() {
    return await databaseService.vip_packages.deleteMany({})
  }
}
const vipPackagesService = new VipPackagesService()
export default vipPackagesService
