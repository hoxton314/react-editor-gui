export interface GroupUserObject {
  isDeleted?: boolean
  name?: string
  userId: string
}

export interface GroupListItem {
  id: string
  name?: string
}

export interface GetGroupList {
  groups: GroupListItem[]
}

export interface Group {
  id: string
  members: GroupUserObject[]
  name: string
}

export interface PostGroup {
  name: string
  members?: string[]
}

export interface ModifyUsersInGroup {
  groupId: string
  memberIds: string[]
  forceInvalidateSessions?: boolean
}
