import { GroupListItem } from './Group'

export type ResourceType = 'Config' | 'Secret'

export type Operation = 'Read' | 'Write' | 'Delete'

export interface Permission {
  resourceType: ResourceType
  resourceName: string
  operation: string
  allowedGroups?: GroupListItem[]
}

export interface GetPermissions {
  permissions: Permission[]
}

export interface PermissionListItem extends Permission {
  id: string
}
