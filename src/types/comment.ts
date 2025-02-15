export interface Comment {
  id: number
  userId: number
  postId: number
  content: string
  likes: number
  createdAt: string
  username?: string
}
