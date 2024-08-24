import { toast } from 'react-toastify'
import { axiosInstance } from '@methods/axiosConfig'
import { encodeString } from '@methods/encode'
import { GetPermissions, Operation, ResourceType } from '@customTypes/Permissions'
import axios from 'axios'
import { capabilityRes } from '../constants/mocks/requestsData'

const DEV_MODE = process.env.DEV_MODE === 'true'

interface PostCreatePermissionData {
  resourceType: ResourceType
  resourceName: string
  operation: Operation | string
  allowedGroups?: string[]
}

interface DeletePermissionData {
  resourceType: string
  resourceName: string
  operation: string
}

interface GetListPermissionsForResourceData {
  resourceType: string
  resourceName: string
}

interface PutOrDeleteGroupsToPermissionData {
  resourceType: string
  resourceName: string
  operation: string
  allowedGroups: string[]
}

export const getPermissionsList = async () => {
  try {
    return await axiosInstance.get<GetPermissions>('/permissions')
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
    return { data: { permissions: [] } }
  }
}

export const createPermission = async (data: PostCreatePermissionData) => {
  try {
    return await axiosInstance.put('/permissions', data)
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}

export const deletePermission = async ({ resourceType, resourceName, operation }: DeletePermissionData) => {
  try {
    return await axiosInstance.delete(
      `/permissions/type/${encodeString(resourceType)}/name/${encodeString(resourceName)}/operation/${encodeString(operation)}`,
    )
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}

export const listPermissionsForResource = async ({ resourceType, resourceName }: GetListPermissionsForResourceData) => {
  try {
    const res = await axiosInstance.get<GetPermissions>(
      `/permissions/type/${encodeString(resourceType)}/name/${encodeString(resourceName)}`,
    )
    return { success: true, data: res.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, error: error }
    } else {
      console.error('Unexpected error', error)
      return { success: false }
    }
  }
}

export const listPermissionsForGroup = async (groupId: string) => {
  try {
    return await axiosInstance.get<GetPermissions>(`/groups/${encodeString(groupId)}/permissions`)
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}

export const addGroupsToPermission = async ({
  resourceType,
  resourceName,
  operation,
  allowedGroups,
}: PutOrDeleteGroupsToPermissionData) => {
  try {
    return await axiosInstance.put(
      `/permissions/type/${encodeString(resourceType)}/name/${encodeString(resourceName)}/operation/${encodeString(operation)}/allowed-groups`,
      { allowedGroups },
    )
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}

export const deleteGroupsFromPermission = async ({
  resourceType,
  resourceName,
  operation,
  allowedGroups,
}: PutOrDeleteGroupsToPermissionData) => {
  try {
    return await axiosInstance.delete(
      `/permissions/type/${encodeString(resourceType)}/name/${encodeString(resourceName)}/operation/${encodeString(operation)}/allowed-groups`,
      { data: { allowedGroups } },
    )
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}

export interface CheckIfUserHasPermFor {
  resourceType: string
  resourceName: string
  operation: 'Write' | 'Delete' | 'Read'
  authorized: boolean
}

export const checkIfUserCanEditResource = async (resourceName: string) => {
  if (DEV_MODE) {
    return {
      data: capabilityRes,
    }
  }

  try {
    return await axiosInstance.get<CheckIfUserHasPermFor>(
      `/permissions/type/Config/name/${encodeString(resourceName)}/operation/Write/users/current`,
    )
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}

export const checkIfUserCanDeleteResource = async (resourceName: string) => {
  if (DEV_MODE) {
    return {
      data: capabilityRes,
    }
  }

  try {
    return await axiosInstance.get<CheckIfUserHasPermFor>(
      `/permissions/type/Config/name/${encodeString(resourceName)}/operation/Delete/users/current`,
    )
  } catch (e) {
    console.log(e)
  }
}
