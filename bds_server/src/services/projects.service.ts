import { PROJECT_SCHEMA } from '~/models/schemas/Project.schema'
import databaseService from './database.service'
import { PROJECT_REQUEST_BODY } from '~/models/requests/projects.request'
import { ObjectId } from 'mongodb'

class ProjectsService {
  async createOne(payload: PROJECT_REQUEST_BODY) {
    return await databaseService.projects.insertOne(
      new PROJECT_SCHEMA({ ...payload, property_id: new ObjectId(payload.property_id) })
    )
  }
  async getAll() {
    return await databaseService.projects.find().toArray()
  }
  async getAllPaginate({
    page,
    limit,
    sort_by,
    order_by,
    condition
  }: {
    page?: number
    limit?: number
    sort_by?: string
    order_by?: string
    condition?: any
  }) {
    if (!page) page = 1
    if (!limit) limit = 10
    if (!sort_by) sort_by = 'created_at'
    if (!order_by) order_by = 'desc'

    const result = await Promise.all([
      databaseService.projects
        .find(condition)
        .sort({ [sort_by]: order_by === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      databaseService.projects.countDocuments(condition)
    ])
    return {
      items: result[0],
      paginate: {
        totalPage: Math.ceil(result[1] / limit),
        pageSize: result[1],
        page,
        limit
      }
    }
  }
  async getById(id: string) {
    return await databaseService.projects.findOne({ _id: new ObjectId(id) })
  }
  async updateById(id: string, payload: PROJECT_REQUEST_BODY) {
    return await databaseService.projects.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...payload, property_id: new ObjectId(payload.property_id) } },
      { returnDocument: 'after' }
    )
  }
  async deleteById(id: string) {
    return await databaseService.projects.deleteOne({ _id: new ObjectId(id) })
  }
  async deletManyIds(ids: string[]) {
    return await databaseService.projects.deleteMany({ _id: { $in: ids.map((id) => new ObjectId(id)) } })
  }
  async deleteAll() {
    return await databaseService.projects.deleteMany({})
  }
}
const projectsService = new ProjectsService()
export default projectsService
