import { ObjectId } from 'mongodb'

interface NewsType {
  _id?: ObjectId
  title: string
  content: {
    type: 'text' | 'image' | 'video'
    description: string
  }
  view: number
  created_by: ObjectId
  created_at?: Date
  updated_at?: Date
}
export class NEWS_SCHEMA {
  _id: ObjectId
  title: string
  content: {
    type: 'text' | 'image' | 'video'
    description: string
  }
  view: number
  created_by: ObjectId
  created_at: Date
  updated_at: Date
  constructor(news: NewsType) {
    const date = new Date()
    this._id = news._id || new ObjectId()
    this.title = news.title
    this.content = news.content
    this.view = news.view || 0
    this.created_by = news.created_by
    this.created_at = news.created_at || date
    this.updated_at = news.updated_at || date
  }
}
