import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { COMMENT_REQUEST_BODY } from '~/models/requests/comments.quest'
import commentsService from '~/services/comments.service'
import { responseSuccess } from '~/utils/response'
const createComment = async (req: Request<ParamsDictionary, any, COMMENT_REQUEST_BODY, any>, res: Response) => {
  const payload = req.body
  const result = await commentsService.createComment(payload)
  return responseSuccess(res, {
    message: 'Tạo comment thành công',
    data: result
  })
}
const getComments = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { content, limit, page, order_by, sort_by } = req.query as { [key: string]: string }
  const result = await commentsService.getAllComments({
    limit: parseInt(limit),
    page: parseInt(page),
    order_by,
    sort_by,
    condition: {
      content: {
        $regex: content,
        $options: 'i'
      }
    }
  })
  return responseSuccess(res, {
    message: 'Lấy danh sách bình luận thành công',
    data: result
  })
}
const getCommentsOfPostId = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { postId } = req.params
  const result = await commentsService.getCommentsByPostId(postId)
  return responseSuccess(res, {
    message: 'Lấy danh sách bình luận thành công',
    data: result
  })
}
const updateComment = async (req: Request<ParamsDictionary, any, COMMENT_REQUEST_BODY, any>, res: Response) => {
  const { commentId } = req.params
  const payload = req.body
  const result = await commentsService.updateComment(commentId, payload)
  return responseSuccess(res, {
    message: 'Cập nhật comment thành công',
    data: result
  })
}
const deleteComment = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { id } = req.params
  const result = await commentsService.deleteComment(id)
  return responseSuccess(res, {
    message: 'Xóa comment thành công',
    data: result
  })
}
const deleteAllCommentsOfPostID = async (req: Request<ParamsDictionary, any, any, any>, res: Response) => {
  const { postId } = req.params
  const result = await commentsService.deleteAllCommentsOfPostId(postId)
  return responseSuccess(res, {
    message: 'Xóa tất cả comment của bài viết thành công',
    data: result
  })
}
const commentsControllers = {
  createComment,
  getComments,
  getCommentsOfPostId,
  updateComment,
  deleteComment,
  deleteAllCommentsOfPostID
}
export default commentsControllers
