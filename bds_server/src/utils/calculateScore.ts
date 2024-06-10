import { REAL_ESTATE_NEW_SCHEMA } from '~/models/schemas/RealEstateNew.schema'

export const calculateScoreWhenView = async (post: REAL_ESTATE_NEW_SCHEMA) => {
  return (post.score += 0.5)
}
export const calculateScoreWhenLike = async (post: REAL_ESTATE_NEW_SCHEMA) => {
  return (post.score += 1)
}
export const calculateScoreWhenComment = async (post: REAL_ESTATE_NEW_SCHEMA) => {
  return (post.score += 2)
}
