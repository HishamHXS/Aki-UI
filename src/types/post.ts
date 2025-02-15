import type { Comment } from '../types/comment'

export interface Post {
  id: number
  userId: number
  title: string
  content: string
  likes: number
  createdAt: string
  username?: string
  comments: Comment[]
}
