export interface User {
  id: string
  name: string
  email: string
  entraUserId?: string
  isDeleted?: boolean
}

export interface CurrentUser {
  userId: string
  userName: string
  email: string
  capabilities: string[]
}

export interface GetUserList {
  users: User[]
}

export interface PostUser {
  name: string
  email: string
}
