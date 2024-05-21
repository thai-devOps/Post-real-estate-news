import { FURNITURE_STATUS } from '~/enums/util.enum'

export interface FURNITURE_DETAILS_REQUEST_BODY {
  name: string
  status: FURNITURE_STATUS
  quantity: number
  post_id: string
  furniture_id: string
}
