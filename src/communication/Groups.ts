import { toast } from 'react-toastify'
import { axiosInstance } from '@methods/axiosConfig'
import { encodeString } from '@methods/encode'
import { GetGroupList, Group, ModifyUsersInGroup, PostGroup } from '@customTypes/Group'
import { ApiResponse } from './Configurations'
import axios from 'axios'
import { getGroupDetails, getGroupList } from '@/constants/mocks/requestsData'

const DEV_MODE = process.env.DEV_MODE === 'true'

export const getGroupsList = async () => {
  try {
    return await axiosInstance.get<GetGroupList>(`/groups`)
  } catch (e) {
    console.log(e)
    return { data: { groups: [] } }
  }
}

export const getGroup = async (groupId: string): Promise<ApiResponse<Group>> => {
  if (DEV_MODE) {
    return {
      success: true,
      data: { ...getGroupList.groups.find((group) => group.id === groupId), members: getGroupDetails.members },
    }
  }

  try {
    const res = await axiosInstance.get<Group>(`/groups/${encodeString(groupId)}`)
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

export const addGroup = async (group: PostGroup) => {
  try {
    return await axiosInstance.post(`/groups`, group)
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}

export const deleteGroup = async (groupId: string) => {
  try {
    return await axiosInstance.delete(`/groups/${encodeString(groupId)}`)
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}

export const addUsersToGroup = async ({ groupId, memberIds }: ModifyUsersInGroup) => {
  try {
    return await axiosInstance.put(`/groups/${encodeString(groupId)}/members`, { memberIds })
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}

export const deleteUsersFromGroup = async ({ groupId, memberIds, forceInvalidateSessions }: ModifyUsersInGroup) => {
  try {
    return await axiosInstance.delete(`/groups/${encodeString(groupId)}/members`, {
      data: { memberIds, forceInvalidateSessions },
    })
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}
