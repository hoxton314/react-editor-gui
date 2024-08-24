import { action, computed, makeAutoObservable, runInAction } from 'mobx'
import { AccessManagementTabTypes } from './CodeView.store'
import { Timeout } from '@/types/General'

export type MenuTab = 'configurations' | 'permissions' | 'tools' | 'bugs' | 'settings'

export type ContextMenuType =
  | 'tab'
  | 'configuration-list-item'
  | 'user-list-item'
  | 'group-list-item'
  | 'permission-list-item'
  | 'toolbox-add-btn'
  | 'toolbox-action-dropdown'
  | 'toolbox-tab-dropdown'

export type ContextMenuStyle = 'default' | 'dropdown'

export type ToolsTab = '' | 'links' | 'create-incident'

export interface ContextMenu {
  isVisible: boolean
  position: { x: number; y: number }
  type: ContextMenuType
  style?: ContextMenuStyle
  contextId?: string
  contextProperty?: string
  parentBoundingRect?: DOMRect
}

export interface Tooltip {
  isVisible: boolean
  displayText: string
  boundingRect: DOMRect | null
  offset?: number
}

export type Categories = 'category1' | 'category2'

interface LeftSidebar {
  isOpened: boolean
  selectedConfigurationTab: Categories
  configurationsSearchQuery: string
  selectedAccessManagementTab: AccessManagementTabTypes
  accessManagementSearchQuery: string
  selectedToolsTab: ToolsTab
  widths: {
    configurations: number
    permissions: number
    tools: number
  }
}

interface RightSidebar {
  isOpened: boolean
  isEmpty: boolean
  width: number
  shouldHideOnEmpty: boolean
}

export class UserInterfaceStore {
  rootStore

  get sidebarsWidthSum() {
    const leftSidebarWidth = this.leftSidebar.isOpened ? this.gridDimensions.leftSidebarWidth : 0
    const rightSidebarWidth = this.isRightSidebarVisible ? this.gridDimensions.rightSidebarWidth : 0

    return leftSidebarWidth + rightSidebarWidth + this.gridDimensions.menuWidth
  }

  get gridDimensions() {
    const menuWidth = 84

    return {
      leftSidebarWidth: this.leftSidebar.widths[this.selectedMenuTab] + menuWidth,
      rightSidebarWidth: this.rightSidebar.width,
      menuWidth,
    }
  }

  selectedMenuTab: MenuTab = 'configurations'

  // come up with breadcrumb element interface
  breadcrumbArray = []

  // context menu
  contextMenu: ContextMenu = {
    isVisible: false,
    position: { x: 0, y: 0 },
    type: 'tab',
    style: 'default',
    contextId: '',
    contextProperty: '',
    parentBoundingRect: null,
  }

  //tooltip
  tooltipTimeout: Timeout | null = null
  tooltip: Tooltip = {
    isVisible: false,
    displayText: '',
    boundingRect: null,
  }

  // sidebars

  leftSidebar: LeftSidebar = {
    isOpened: true,
    selectedConfigurationTab: 'category1',
    configurationsSearchQuery: '',
    selectedAccessManagementTab: 'user',
    accessManagementSearchQuery: '',
    selectedToolsTab: 'links',
    widths: {
      configurations: 300,
      permissions: 580,
      tools: 300,
    },
  }

  rightSidebar: RightSidebar = {
    isOpened: true,
    isEmpty: true,
    width: 300,
    shouldHideOnEmpty: true,
  }

  get isRightSidebarVisible() {
    if (!this.rightSidebar.shouldHideOnEmpty) {
      return this.rightSidebar.isOpened
    }

    return this.rightSidebar.isOpened && !this.rightSidebar.isEmpty
  }

  constructor(rootStore) {
    makeAutoObservable(this, {
      sidebarsWidthSum: computed,
      gridDimensions: computed,
      isRightSidebarVisible: computed,
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.rootStore = rootStore
    this.restoreSelectedMenuTabFromLocalStorage()
    this.restoreLeftSidebarTabFromLocalStorage()
    this.restoreRightSidebarTabFromLocalStorage()
  }

  @action.bound restoreSelectedMenuTabFromLocalStorage() {
    const storedSelectedMenuTab = localStorage.getItem('selectedMenuTab')

    if (storedSelectedMenuTab) {
      this.selectedMenuTab = storedSelectedMenuTab as MenuTab
    }
  }

  @action restoreLeftSidebarTabFromLocalStorage() {
    const storedLeftSidebar = JSON.parse(localStorage.getItem('leftSidebarData')) as LeftSidebar

    if (storedLeftSidebar && storedLeftSidebar?.widths?.configurations) {
      this.leftSidebar = storedLeftSidebar
    }
  }

  @action restoreRightSidebarTabFromLocalStorage() {
    const storedRightSidebar = JSON.parse(localStorage.getItem('rightSidebarData'))

    if (storedRightSidebar && storedRightSidebar?.width) {
      this.rightSidebar = storedRightSidebar as RightSidebar
    }
  }

  @action.bound setLeftSidebarWidth(width) {
    localStorage.setItem(
      'leftSidebarData',
      JSON.stringify({
        ...this.leftSidebar,
        widths: { ...this.leftSidebar.widths, [this.selectedMenuTab]: width },
      }),
    )
    this.leftSidebar.widths[this.selectedMenuTab] = width
  }

  @action.bound setRightSidebarWidth(width) {
    localStorage.setItem('rightSidebarData', JSON.stringify({ ...this.rightSidebar, width }))
    this.rightSidebar.width = width
  }

  @action.bound setRightSidebarEmpty(isEmpty: boolean) {
    localStorage.setItem('rightSidebarData', JSON.stringify({ ...this.rightSidebar, isEmpty }))

    runInAction(() => {
      this.rightSidebar.isEmpty = isEmpty
    })
  }

  @action.bound setRightSidebarShouldHideOnEmpty(shouldHideOnEmpty: boolean) {
    localStorage.setItem('rightSidebarData', JSON.stringify({ ...this.rightSidebar, shouldHideOnEmpty }))
    this.rightSidebar.shouldHideOnEmpty = shouldHideOnEmpty
  }

  @action.bound setSelectedMenuTab(tab: MenuTab) {
    localStorage.setItem('selectedMenuTab', tab)
    this.selectedMenuTab = tab
    this.breadcrumbArray = [tab]
  }

  @action.bound setContextMenuData(data: ContextMenu) {
    this.contextMenu = data
  }

  @action.bound hideContextMenu() {
    this.contextMenu = {
      isVisible: false,
      position: { x: 0, y: 0 },
      type: 'tab',
      contextId: '',
    }
  }

  @action.bound setLeftSidebarOpened(opened: boolean) {
    this.leftSidebar.isOpened = opened
  }

  @action.bound toggleLeftSidebar() {
    this.leftSidebar.isOpened = !this.leftSidebar.isOpened
  }

  @action.bound setRightSidebarOpened(opened: boolean) {
    this.rightSidebar.isOpened = opened
  }

  @action.bound toggleRightSidebar() {
    this.rightSidebar.isOpened = !this.rightSidebar.isOpened
  }

  @action.bound setConfigurationsSearchQuery(query: string) {
    this.leftSidebar.configurationsSearchQuery = query
  }

  @action.bound setAccessManagementSearchQuery(query: string) {
    this.leftSidebar.accessManagementSearchQuery = query
  }

  @action.bound setSelectedConfigurationTab(tab: Categories) {
    localStorage.setItem('leftSidebarData', JSON.stringify({ ...this.leftSidebar, selectedConfigurationTab: tab }))
    this.leftSidebar.selectedConfigurationTab = tab
  }

  @action.bound setSelectedAccessManagementTab(tab: AccessManagementTabTypes) {
    localStorage.setItem('leftSidebarData', JSON.stringify({ ...this.leftSidebar, selectedAccessManagementTab: tab }))
    this.leftSidebar.selectedAccessManagementTab = tab
  }

  @action.bound setSelectedToolsTab(tab: ToolsTab) {
    localStorage.setItem('leftSidebarData', JSON.stringify({ ...this.leftSidebar, selectedToolsTab: tab }))
    this.leftSidebar.selectedToolsTab = tab
  }

  @action.bound setTooltipData(data: Tooltip) {
    this.tooltip = data
  }

  @action.bound hideTooltip() {
    this.tooltip = {
      isVisible: false,
      boundingRect: null,
      displayText: '',
    }
  }

  @action.bound setTooltipTimeout(timeout: Timeout) {
    this.tooltipTimeout = timeout
  }

  @action.bound clearTooltipTimeout() {
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout)
      this.tooltipTimeout = null
    }
  }
}
