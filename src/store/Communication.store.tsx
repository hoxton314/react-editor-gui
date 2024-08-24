import { action, computed, makeAutoObservable, runInAction } from 'mobx'
import { axiosInstance } from '@methods/axiosConfig'
import { ConfigurationListItem } from '@customTypes/Configuration'
import { CurrentUser, User } from '@customTypes/User'
import { Group, GroupListItem } from '@customTypes/Group'
import { SelectList } from '@customTypes/General'
import { getUsersForSelect, getUsersList } from '@communication/Users'
import { Permission, PermissionListItem } from '@customTypes/Permissions'
import { getGroupsList } from '@communication/Groups'
import { getPermissionsList } from '@communication/Permissions'
import { sortObj } from '@methods/sort'
import { getConfigurations1List, getConfigurations2List } from '@communication/Configurations'

interface CapabilitiesComputed {
  isSuperAdmin: boolean
  isAllowedToManageConfig: boolean
  isAllowedToManageAccess: boolean
  isAllowedIncidentManagement: boolean
}

export class CommunicationStateStore {
  rootStore
  isAuthenticated = false
  initialAuthCheck = false
  currentUser: CurrentUser = {
    userId: '',
    userName: '',
    email: '',
    capabilities: [],
  }

  get capabilitiesComputed(): CapabilitiesComputed {
    const cap = this.currentUser?.capabilities
    const isSuperAdmin = cap?.includes('SUPER_ADMIN')

    return {
      isSuperAdmin,
      isAllowedToManageConfig: cap?.includes('CLIENT_CONFIG_MANAGEMENT') || isSuperAdmin,
      isAllowedToManageAccess: cap?.includes('ACCESS_MANAGEMENT') || isSuperAdmin,
      isAllowedIncidentManagement: cap?.includes('INCIDENT_MANAGEMENT') || isSuperAdmin,
    }
  }

  userSelectList: SelectList = []
  groupSelectList: SelectList = []
  permSelectList: SelectList = []

  isConfigFetchLoading = true
  configurationCategory1List: ConfigurationListItem[] = []
  configurationCategory2List: ConfigurationListItem[] = []

  isAccessManagementFetchLoading = true
  shouldIncludeDeleted = true
  usersList: User[] = []
  groupsList: GroupListItem[] = []
  permissionsList: PermissionListItem[] = []

  currentGroup: Group = {} as Group
  currentPermission: Permission = {} as Permission

  isGroupActionLoading = false
  isUserActionLoading = false
  isPermActionLoading = false

  constructor(rootStore) {
    makeAutoObservable(this, {
      capabilitiesComputed: computed,
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.rootStore = rootStore
    this.restoreShouldIncludeDeleted()
  }

  @action.bound setAuthorization(auth: boolean): void {
    this.isAuthenticated = auth
  }

  @action.bound logout() {
    this.initialAuthCheck = false
    this.isAuthenticated = false
    this.currentUser = {
      userId: '',
      userName: '',
      email: '',
      capabilities: [],
    }
  }

  @action.bound async checkLogin() {
    try {
      const { data } = await axiosInstance.get(`/users/current`)

      runInAction(() => {
        this.initialAuthCheck = true
        this.isAuthenticated = true
        this.currentUser = data
      })
    } catch (e) {
      runInAction(() => {
        this.initialAuthCheck = true
        this.isAuthenticated = this.rootStore.AppState.DEV_MODE
      })
      console.log(e)
    }
  }

  @action.bound async fetchUserSelectList() {
    const data = await getUsersForSelect()
    this.userSelectList = sortObj(data, 'label')
  }

  @action.bound async fetchGroupSelectList() {
    const { data } = await getGroupsList()

    const selectData = data?.groups?.map((group) => ({
      value: group.id,
      label: group.name,
    }))

    this.groupSelectList = sortObj(selectData, 'label')
  }

  @action.bound async fetchPermSelectList() {
    const { data } = await getPermissionsList()

    const selectData = data?.permissions?.map((perm) => ({
      value: `${perm.resourceType}-${perm.resourceName}-${perm.operation}`,
      label: `${perm.resourceType} - ${perm.resourceName} - ${perm.operation}`,
    }))

    this.permSelectList = sortObj(selectData, 'label')
  }

  @action.bound async fetchAllDataForInputs() {
    if (!this.currentUser?.capabilities?.includes('ACCESS_MANAGEMENT')) return

    this.fetchUserSelectList()
    this.fetchGroupSelectList()
    this.fetchPermSelectList()
  }

  @action.bound async fetchConfigurationLists() {
    runInAction(() => {
      this.isConfigFetchLoading = true
    })

    const { data: configs1 } = await getConfigurations1List()
    const { data: configs2 } = await getConfigurations2List()

    this.setConfigurationCategory1List(configs1)
    this.setConfigurationCategory2List(configs2)

    runInAction(() => {
      this.isConfigFetchLoading = false
    })
  }

  @action.bound async fetchAllAccessManagementLists() {
    runInAction(() => {
      this.isAccessManagementFetchLoading = true
    })

    const [userRes, groupRes, permissionRes] = await Promise.all([
      getUsersList({ includeDeleted: this.shouldIncludeDeleted }),
      getGroupsList(),
      getPermissionsList(),
    ])

    this.setUsersList(userRes?.data?.users)
    this.setGroupsList(groupRes?.data?.groups)
    this.setPermissionsList(permissionRes?.data?.permissions)

    runInAction(() => {
      this.isAccessManagementFetchLoading = false
    })
  }

  @action.bound setConfigurationCategory1List(payload: ConfigurationListItem[]) {
    this.configurationCategory1List = sortObj(payload, 'name')
  }

  @action.bound setConfigurationCategory2List(payload: ConfigurationListItem[]) {
    this.configurationCategory2List = sortObj(payload, 'name')
  }

  @action.bound setUsersList(payload: User[]) {
    this.usersList = sortObj(payload, 'name')
  }

  @action.bound setGroupsList(payload: GroupListItem[]) {
    this.groupsList = sortObj(payload, 'name')
  }

  @action.bound setPermissionsList(payload: Permission[]) {
    this.permissionsList = payload?.map((perm) => ({
      id: `${perm?.resourceType}-${perm?.resourceName}-${perm?.operation}`,
      ...perm,
    }))
  }

  @action.bound setCurrentGroup(payload: Group) {
    this.currentGroup = payload
  }

  @action.bound setCurrentPermission(payload: PermissionListItem) {
    this.currentPermission = payload
  }

  @action.bound setGroupActionLoading(payload: boolean) {
    this.isGroupActionLoading = payload
  }

  @action.bound setUserActionLoading(payload: boolean) {
    this.isUserActionLoading = payload
  }

  @action.bound setPermActionLoading(payload: boolean) {
    this.isPermActionLoading = payload
  }

  @action.bound setShouldIncludeDeleted(payload: boolean) {
    this.shouldIncludeDeleted = payload
    localStorage.setItem('shouldIncludeDeleted', JSON.stringify(payload))
  }

  @action.bound restoreShouldIncludeDeleted() {
    const stored = JSON.parse(localStorage.getItem('shouldIncludeDeleted'))
    if (typeof stored === 'boolean') {
      this.shouldIncludeDeleted = stored
    }
  }

  @action fetchUserList = async () => {
    runInAction(() => {
      this.isAccessManagementFetchLoading = true
    })

    const { data } = await getUsersList({ includeDeleted: this.shouldIncludeDeleted })
    if (!data.users) return
    this.setUsersList(data.users)

    runInAction(() => {
      this.isAccessManagementFetchLoading = false
    })
  }

  @action fetchGroupList = async () => {
    runInAction(() => {
      this.isAccessManagementFetchLoading = true
    })

    const { data } = await getGroupsList()
    if (!data.groups) return
    this.setGroupsList(data.groups)

    runInAction(() => {
      this.isAccessManagementFetchLoading = false
    })
  }

  @action fetchPermissionList = async () => {
    runInAction(() => {
      this.isAccessManagementFetchLoading = true
    })

    const { data } = await getPermissionsList()
    if (!data.permissions) return
    this.setPermissionsList(data.permissions)

    runInAction(() => {
      this.isAccessManagementFetchLoading = false
    })
  }
}
