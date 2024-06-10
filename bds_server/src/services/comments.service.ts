import { COMMENT_REQUEST_BODY } from '~/models/requests/comments.quest'
import databaseService from './database.service'
import { COMMENT_SCHEMA } from '~/models/schemas/Comment.schema'
import { ObjectId } from 'mongodb'

class CommentsService {
  public async createComment(payload: COMMENT_REQUEST_BODY) {
    return await databaseService.comments.insertOne(
      new COMMENT_SCHEMA({
        ...payload,
        post_id: new ObjectId(payload.post_id),
        user_id: new ObjectId(payload.user_id)
      })
    )
  }
  public async getAllComments({
    page,
    limit,
    order_by,
    sort_by,
    condition
  }: {
    page: number
    limit: number
    sort_by: string
    order_by: string
    condition: any
  }) {
    const result = await Promise.all([
      databaseService.comments
        .find(condition)
        .sort({ [sort_by]: order_by === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      databaseService.comments.countDocuments(condition)
    ])
    return {
      items: result[0],
      paginate: {
        total: Math.ceil(result[1] / limit),
        page,
        limit
      }
    }
  }
  public async getCommentById(id: string) {
    return await databaseService.comments.findOne({ _id: new ObjectId(id) })
  }
  public async getCommentsByPostId(post_id: string) {
    return await databaseService.comments.find({ post_id: new ObjectId(post_id) }).toArray()
  }
  public async updateComment(id: string, payload: COMMENT_REQUEST_BODY) {
    return await databaseService.comments.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...payload,
          post_id: new ObjectId(payload.post_id),
          user_id: new ObjectId(payload.user_id),
          updated_at: new Date()
        }
      }
    )
  }
  public async deleteComment(id: string, user_id: string) {
    return await databaseService.comments.findOneAndDelete({
      _id: new ObjectId(id),
      user_id: new ObjectId(user_id)
    })
  }
  public async deleteComments(ids: string[]) {
    return await databaseService.comments.deleteMany({
      _id: { $in: ids.map((id) => new ObjectId(id)) }
    })
  }
  public async deleteAllCommentsOfPostId(post_id: string) {
    return await databaseService.comments.deleteMany({
      post_id: new ObjectId(post_id)
    })
  }
}
const commentsService = new CommentsService()
export default commentsService
