import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { API_URL, STAGE } from '../constants/envs'

import {
  getCategory1List,
  getCategory2List,
  getCurrentUser,
  getGroupDetails,
  getGroupList,
  getPermissions,
  getUsers,
} from '../constants/mocks/requestsData'
import { toast } from 'react-toastify'
import { rootStore } from '@/store/Root.store'

export const axiosInstanceUnauthenticated = axios.create({
  baseURL: API_URL,
})

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
axiosInstance.interceptors.response.use(undefined, async (error: any) => {
  console.error(error)
  if (error.response && error.response.status === 401 && process.env.STAGE === 'prod') {
    if (error.response?.data?.code === 'AuthorizationFailed') {
      toast.error(error.response?.data?.message)
    } else {
      console.log('401 error, showing login page')
      // window.location.href = `${window.location.origin}/login`
      rootStore.CommunicationState.logout()
    }
  }

  return Promise.reject(error)
})

if (STAGE === 'local') {
  // Mocking axios requests for development
  const mockAdapter = new MockAdapter(axiosInstance)

  mockAdapter.onGet('/users').reply(200, getUsers)

  mockAdapter.onGet('/users/current').reply(200, getCurrentUser)

  mockAdapter
    .onGet('/configurations', { params: { type: 'category1', configurationId: '' } })
    .reply(200, getCategory1List)

  mockAdapter
    .onGet('/configurations', { params: { type: 'category2', configurationId: '' } })
    .reply(200, getCategory2List)

  mockAdapter.onPost('/users').reply(200, {})

  mockAdapter.onDelete('/users').reply(200, {})

  mockAdapter.onGet('/groups').reply(200, getGroupList)

  mockAdapter.onGet('/groups/test-id').reply(200, getGroupDetails)

  mockAdapter.onGet('/permissions').reply(200, getPermissions)

  mockAdapter.onPost('/users').timeoutOnce().onGet('/users').reply(200, getUsers)
}
