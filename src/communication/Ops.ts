import { toast } from 'react-toastify'
import { axiosInstance } from '@methods/axiosConfig'

export interface GetOnCallsResponse {
  schedule: string
  participants: string[]
}

export const postCreateIncident = async (incidentBody: {
  message: string
  description: string
  priority: 'P1' | 'P2' | 'P3' | 'P4' | 'P5'
}) => {
  try {
    await axiosInstance.post('/incidents', incidentBody)
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}

export const getOnCalls = async () => {
  try {
    const response = await axiosInstance.get<GetOnCallsResponse[]>('/on-calls')
    return response.data
  } catch (e) {
    console.log(e)
    toast.error('Request failed')
  }
}
