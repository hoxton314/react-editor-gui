import { action, computed, makeAutoObservable, runInAction, toJS } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import { Configuration } from '@customTypes/Configuration'
import { User } from '@customTypes/User'
import { GroupUserObject } from '@customTypes/Group'
import { Permission } from '@customTypes/Permissions'
import { getSideBasedOnIdOrSide } from '@methods/tabs'

export type TabId = string

export type ConfigurationsTabTypes = 'configuration'
export type AccessManagementTabTypes = 'user' | 'group' | 'permission'
export type GeneralTabTypes = 'get-started' | 'json-preview'
export type TabType = ConfigurationsTabTypes | GeneralTabTypes | AccessManagementTabTypes
export type TabList = {
  [key: string]: Tab // key is a UUID string
}
export type Side = 'left' | 'right'

export type WindowsActiveTabs = { left: Tab | undefined; right: Tab | undefined }

export interface GroupTabData {
  id: string
  members?: GroupUserObject[]
  name?: string
}

export interface Tab {
  id: TabId
  title: string
  type: TabType
  shouldRefetchData?: boolean

  configurationId?: string
  configurationData?: Configuration | undefined
  isEditing?: boolean
  hasEditRights?: boolean
  hasDeleteRights?: boolean
  // 'configuration' | 'json-preview'
  jsonObject?: string
  // 'user'
  userData?: User
  // 'group'
  groupData?: GroupTabData
  // 'permission'
  permissionData?: Permission
}

export interface WindowTabBarData {
  isFocused: boolean
  activeTabId: TabId
  openedTabs?: TabId[]
}

interface windowState {
  left: WindowTabBarData
  right: WindowTabBarData
  tabs: TabList
}

interface TabDragState {
  isDragging: boolean
  draggedTabId: TabId
  hoveringOverTabId: TabId | Side
  dragEndXY: { x: number; y: number }
}

export class CodeViewStore {
  rootStore

  containerWidth = 0

  isHorizontalSplit = false
  horizontalWidth = 200

  tabDragState: TabDragState = {
    isDragging: false,
    draggedTabId: '',
    hoveringOverTabId: '',
    dragEndXY: { x: 0, y: 0 },
  }

  currentlyFocusedWindow: Side = 'right'

  windowsState: windowState = {
    left: {
      isFocused: false,
      activeTabId: '',
      openedTabs: [],
    },
    // used for single window too
    right: {
      isFocused: true,
      activeTabId: '',
      openedTabs: [],
    },

    tabs: {},
  }

  get windowsActiveTabs(): WindowsActiveTabs {
    const WindowsActiveTabs: WindowsActiveTabs = {
      left: this.windowsState?.tabs[this.windowsState.left.activeTabId] || undefined,
      right: this.windowsState?.tabs[this.windowsState.right.activeTabId] || undefined,
    }

    return WindowsActiveTabs
  }

  constructor(rootStore) {
    makeAutoObservable(this, {
      windowsActiveTabs: computed,
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.rootStore = rootStore
    this.restoreWindowDimensionsFromLocalStorage()
    this.restoreHorizontalSplitFromLocalStorage()
    this.restoreWindowsStateFromLocalStorage()
  }

  @action.bound setContainerWidth(width: number) {
    this.containerWidth = width
  }

  @action.bound restoreWindowDimensionsFromLocalStorage() {
    const storedHorizontalWidth = JSON.parse(localStorage.getItem('codeViewHorizontalWidth'))

    if (storedHorizontalWidth) {
      this.horizontalWidth = storedHorizontalWidth
    } else {
      const computedWidth = window.innerWidth / 2 - this.rootStore.UserInterfaceState.sidebarsWidthSum
      this.horizontalWidth = computedWidth
      localStorage.setItem('codeViewHorizontalWidth', JSON.stringify(computedWidth))
    }
  }

  @action.bound toggleHorizontalSplit() {
    runInAction(() => {
      if (this.isHorizontalSplit) {
        this.currentlyFocusedWindow = 'right'
        this.moveAllTabsToRight()
      } else {
        // this.moveTabToOppositeWindow({ tabId: this.windowsState.right.activeTabId })
        this.currentlyFocusedWindow = 'left'
        this.handleSplitOn()
      }
    })

    this.isHorizontalSplit = !this.isHorizontalSplit

    localStorage.setItem('codeViewIsHorizontalSplit', JSON.stringify(this.isHorizontalSplit))
    localStorage.setItem('codeViewHorizontalWidth', JSON.stringify(this.horizontalWidth))
    localStorage.setItem('codeViewCurrentlyFocusedWindow', JSON.stringify(this.currentlyFocusedWindow))

    this.saveWindowsStateToLocalStorage()
  }

  @action.bound moveAllTabsToRight() {
    const leftTabs = this.windowsState.left.openedTabs

    leftTabs.forEach((tabId) => {
      this.windowsState.right.openedTabs.push(tabId)
    })

    this.windowsState.left.openedTabs = []
    this.windowsState.left.activeTabId = ''
    this.saveWindowsStateToLocalStorage()
  }

  @action.bound handleSplitOn() {
    const rightTabs = this.windowsState.right.openedTabs
    const currentActiveTab = this.windowsState.right.activeTabId

    rightTabs.forEach((tabId) => {
      if (tabId !== currentActiveTab) {
        this.windowsState.left.openedTabs.push(tabId)
      }
    })

    this.windowsState.right.openedTabs = [currentActiveTab]
    this.windowsState.left.activeTabId = this.windowsState.left.openedTabs[0]
    this.saveWindowsStateToLocalStorage()
  }

  @action.bound restoreHorizontalSplitFromLocalStorage() {
    const storedIsHorizontalSplit = JSON.parse(localStorage.getItem('codeViewIsHorizontalSplit'))
    this.isHorizontalSplit = storedIsHorizontalSplit || this.isHorizontalSplit
  }

  @action.bound setHorizontalWidth(width: number) {
    this.horizontalWidth = width
    localStorage.setItem('codeViewHorizontalWidth', JSON.stringify(width))
  }

  @action.bound closeTab({ id }: { id: TabId }) {
    const side = this.windowsState.left.openedTabs.includes(id) ? 'left' : 'right'
    const tabToClose = this.windowsState.tabs[id]

    if (tabToClose) {
      if (this.windowsState[side].activeTabId === id) {
        const tabIds = this.windowsState[side].openedTabs
        const activeTabIndex = tabIds.indexOf(id)
        const nextActiveTabIndex = activeTabIndex === 0 ? 1 : activeTabIndex - 1
        this.windowsState[side].activeTabId = tabIds[nextActiveTabIndex]
      }

      this.windowsState[side].openedTabs = this.windowsState[side].openedTabs.filter((tabId) => tabId !== id)
      this.storeClosedTabInLocalStorage(tabToClose)
      delete this.windowsState.tabs[id]
      this.saveWindowsStateToLocalStorage()
    }
  }

  @action.bound storeClosedTabInLocalStorage(tab: Tab) {
    const closedTabs = JSON.parse(localStorage.getItem('closedTabs')) || []

    closedTabs.push(tab)

    localStorage.setItem('closedTabs', JSON.stringify(closedTabs.slice(-5)))
  }

  @action.bound setActiveTab({ id, side }: { id: TabId; side: Side }) {
    this.windowsState[side].activeTabId = id

    this.saveWindowsStateToLocalStorage()
  }

  @action.bound addTab({ tab, side }: { tab: Omit<Tab, 'id'>; side: Side }) {
    const newTab: Tab = {
      id: uuidv4(),
      ...tab,
    }

    this.windowsState.tabs[newTab.id] = newTab
    this.windowsState[side].openedTabs.push(newTab.id)
    this.windowsState[side].activeTabId = newTab.id

    this.saveWindowsStateToLocalStorage()
  }

  @action.bound setCurrentlyFocusedWindow(window: Side) {
    this.currentlyFocusedWindow = window
  }

  @action.bound setTabConfigurationData({
    tabId,
    configurationData,
  }: {
    tabId: TabId
    configurationData: Configuration
  }) {
    const tabs = this.windowsState?.tabs[tabId]

    if (tabs) {
      tabs.configurationData = configurationData
      tabs.jsonObject = JSON.stringify(configurationData?.current, null, 4)
      this.saveWindowsStateToLocalStorage()
    }
  }

  @action.bound restoreWindowsStateFromLocalStorage() {
    const storedWindowsState = JSON.parse(localStorage.getItem('windowsState'))

    const windowTabLength = storedWindowsState?.tabs && Object?.keys(storedWindowsState?.tabs)?.length

    if (storedWindowsState && windowTabLength) {
      this.windowsState = storedWindowsState
    }

    if (!windowTabLength) {
      this.addTab({
        tab: {
          title: 'Get Started',
          type: 'get-started',
        },
        side: 'right',
      })
    }

    const restoredLeftActiveTab = this.windowsState.left.activeTabId
    const restoredRightActiveTab = this.windowsState.right.activeTabId

    if (!this.windowsState.left.openedTabs.includes(restoredLeftActiveTab)) {
      this.windowsState.left.activeTabId = this.windowsState.left.openedTabs?.at(0) || ''
    }

    if (!this.windowsState.right.openedTabs.includes(restoredRightActiveTab)) {
      this.windowsState.right.activeTabId = this.windowsState.right.openedTabs?.at(0) || ''
    }
  }

  @action.bound saveWindowsStateToLocalStorage() {
    const clonedWindowsState = structuredClone(toJS(this.windowsState)) as windowState

    for (const tabId of Object.keys(clonedWindowsState.tabs)) {
      if (clonedWindowsState.tabs[tabId]?.type === 'json-preview') {
        delete clonedWindowsState.tabs[tabId]
        clonedWindowsState.right.openedTabs = clonedWindowsState.right.openedTabs.filter((id) => id !== tabId)
        clonedWindowsState.left.openedTabs = clonedWindowsState.left.openedTabs.filter((id) => id !== tabId)
      } else {
        delete clonedWindowsState.tabs[tabId]?.isEditing
        delete clonedWindowsState.tabs[tabId]?.jsonObject
        delete clonedWindowsState.tabs[tabId]?.configurationData
      }
    }

    localStorage.setItem('windowsState', JSON.stringify(clonedWindowsState))
  }

  @action.bound toggleEditModeForCurrentlyFocusedWindow() {
    const tabId = this.windowsState[this.currentlyFocusedWindow].activeTabId
    const tab = this.windowsState.tabs[tabId]

    if (tab?.type === 'configuration') {
      this.windowsState.tabs[tabId].isEditing = !tab?.isEditing
      this.windowsState.tabs[tabId].jsonObject = JSON.stringify(tab?.configurationData?.current, null, 4)
      this.saveWindowsStateToLocalStorage()
    }
  }

  @action.bound setTabJsonData({ tabId, jsonObject }: { tabId: TabId; jsonObject: string }) {
    const tab = this.windowsState.tabs[tabId]

    if (tab) {
      this.windowsState.tabs[tabId].jsonObject = jsonObject
    }
  }

  @action.bound closeAllBackgroundTabs(activeTabId: string) {
    const activeTab = this.windowsState.tabs[activeTabId]

    if (activeTab) {
      const side = this.windowsState.left.openedTabs.includes(activeTabId) ? 'left' : 'right'

      this.windowsState[side].openedTabs.forEach((tabId) => {
        if (tabId !== activeTabId) {
          this.closeTab({ id: tabId })
        }
      })
    }
  }

  @action.bound closeAllTabs(side?: string) {
    if (side) {
      this.windowsState[side].openedTabs.forEach((tabId) => {
        this.closeTab({ id: tabId })
      })
    } else {
      const tabIds = Object.keys(this.windowsState.tabs)
      tabIds.forEach((tabId) => {
        this.closeTab({ id: tabId })
      })
    }
  }

  @action.bound moveTabsFromRightToLeft() {
    this.isHorizontalSplit = true

    const rightTabs = this.windowsState.right.openedTabs

    rightTabs.forEach((tabId) => {
      this.windowsState.left.openedTabs.push(tabId)
    })

    this.windowsState.right.openedTabs = []
  }

  @action.bound moveTabToOppositeWindow({ tabId }: { tabId: TabId }) {
    const tab = this.windowsState.tabs[tabId]

    if (tab) {
      const oldSide = this.windowsState.left.openedTabs.includes(tabId) ? 'left' : 'right'
      const newSide = oldSide === 'left' ? 'right' : 'left'

      this.windowsState[oldSide].openedTabs = this.windowsState[oldSide].openedTabs.filter((id) => id !== tabId)
      this.windowsState[newSide].openedTabs.push(tabId)
      this.windowsState[newSide].activeTabId = tabId
      this.windowsState[oldSide].activeTabId = this.windowsState[oldSide].openedTabs?.at(0) || ''

      this.saveWindowsStateToLocalStorage()
    }
  }

  @action.bound setIsTabDragging(isDragging: boolean) {
    this.tabDragState.isDragging = isDragging
  }

  @action.bound setDraggedTabId(tabId: TabId) {
    runInAction(() => {
      this.tabDragState.draggedTabId = tabId
    })
  }

  @action.bound setHoveringOverTabId(tabId: TabId | Side) {
    this.tabDragState.hoveringOverTabId = tabId
  }

  @action.bound handleTabDrop() {
    const movedTabId = this.tabDragState.draggedTabId
    const refTabIdOrSide = this.tabDragState.hoveringOverTabId

    const targetSide = getSideBasedOnIdOrSide(refTabIdOrSide, this.rootStore)

    if (!targetSide || !movedTabId || !refTabIdOrSide) return

    const currentSide = this.windowsState.left.openedTabs.includes(movedTabId) ? 'left' : 'right'

    const currentTabs = this.windowsState[currentSide].openedTabs
    this.windowsState[currentSide].openedTabs = currentTabs.filter((tabId) => tabId !== movedTabId)

    const isMovingToEmptySide = refTabIdOrSide === 'left' || refTabIdOrSide === 'right'

    if (isMovingToEmptySide) {
      this.windowsState[targetSide].openedTabs.push(movedTabId)
    } else {
      const refTabIndex = this.windowsState[targetSide].openedTabs.indexOf(refTabIdOrSide)
      this.windowsState[targetSide].openedTabs.splice(refTabIndex, 0, movedTabId)
    }

    // update active tab
    this.windowsState[targetSide].activeTabId = movedTabId
    if (targetSide !== currentSide) {
      this.windowsState[currentSide].activeTabId = this.windowsState[currentSide].openedTabs[0]
    }

    this.tabDragState.draggedTabId = ''
    this.saveWindowsStateToLocalStorage()
  }

  // #TODO: Maybe merge these two methods into one in the future

  @action.bound setTabPropertyValue({
    tabId,
    property,
    value,
  }: {
    tabId: TabId
    property: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  }) {
    const tab = this.windowsState.tabs[tabId]

    if (tab?.id) {
      this.windowsState.tabs[tabId][property] = value
      this.saveWindowsStateToLocalStorage()
    }
  }

  @action.bound updateTabValue(payload: {
    tabId
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }) {
    const { tabId, ...rest } = payload

    const tab = this.windowsState.tabs[tabId]

    if (tab?.id) {
      this.windowsState.tabs[tabId] = {
        ...tab,
        ...rest,
      }

      this.saveWindowsStateToLocalStorage()
    }
  }
}
