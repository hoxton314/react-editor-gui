import { axiosInstance } from '@methods/axiosConfig'
import { GetUserList, PostUser } from '@customTypes/User'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getUsers } from '@/constants/mocks/requestsData'

const DEV_MODE = process.env.DEV_MODE === 'true'

export const getUsersList = async ({ includeDeleted }: { includeDeleted?: boolean }) => {
  if (DEV_MODE) {
    if (includeDeleted) {
      return {
        success: true,
        data: getUsers,
      }
    } else {
      return {
        success: true,
        data: { users: getUsers.users.filter((user) => !user.isDeleted) },
      }
    }
  }

  try {
    return await axiosInstance.get<GetUserList>(`/users`, {
      params: {
        includeDeleted,
      },
    })
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
    return { data: { users: [] } }
  }
}

export const addUser = async (data: PostUser) => {
  try {
    return await axiosInstance.post(`/users`, data)
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}

export const deleteUser = async (userId: string) => {
  try {
    return await axiosInstance.delete(`/users/${userId}`)
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}

export const getUsersForSelect = async () => {
  try {
    const { data } = await axiosInstance.get<GetUserList>(`/users`, {
      params: {
        includeDeleted: false,
      },
    })

    return data.users.map((user) => ({
      value: user.id,
      label: user.name,
    }))
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}

export const invalidateUserSession = async (userId: string) => {
  try {
    const res = await axiosInstance.delete(`/users/${userId}/sessions`)

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
