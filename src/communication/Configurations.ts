import { toast } from 'react-toastify'
import { axiosInstance } from '@methods/axiosConfig'
import { STAGE } from '../constants/envs'
import { Configuration, ConfigurationListItem } from '@customTypes/Configuration'
import axios, { AxiosError } from 'axios'
import { configurations } from '@/constants/mocks/requestsData'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: AxiosError
}

export const getConfigurations1List = async (id?: string) => {
  try {
    return await axiosInstance.get<ConfigurationListItem[]>(`/configurations`, {
      params: {
        type: 'category1',
        configurationId: id || '',
      },
    })
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}

export const getConfigurations2List = async (id?: string) => {
  try {
    return await axiosInstance.get<ConfigurationListItem[]>(`/configurations`, {
      params: {
        type: 'category2',
        configurationId: id || '',
      },
    })
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}

export const getConfiguration = async (configurationId: string): Promise<ApiResponse<Configuration>> => {
  let res
  try {
    if (STAGE === 'local') {
      res = { data: configurations.find((config) => config.current.configurationId === configurationId) }
    } else {
      res = await axiosInstance.get<Configuration>(`/configuration`, {
        params: {
          configurationId,
        },
      })
    }

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const putConfiguration = async (configuration: any): Promise<ApiResponse<null>> => {
  if (STAGE === 'local') {
    return { success: true, data: null }
  }

  try {
    await axiosInstance.put(`/configuration`, configuration)

    return { success: true, data: null }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, error: error }
    } else {
      console.error('Unexpected error', error)
      return { success: false }
    }
  }
}

export const createConfiguration = async (
  configuration: Configuration,
  allowedGroups: string[],
): Promise<ApiResponse<Configuration>> => {
  try {
    const res = await axiosInstance.post<Configuration>(`/configuration`, {
      configuration,
      allowedGroups,
    })

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

export const deleteConfiguration = async (configurationId: string): Promise<ApiResponse<null>> => {
  try {
    return await axiosInstance.delete(`/configuration/${configurationId}`)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, error: error }
    } else {
      console.error('Unexpected error', error)
      return { success: false }
    }
  }
}
