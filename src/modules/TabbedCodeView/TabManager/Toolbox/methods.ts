import { deleteConfiguration, putConfiguration } from '@/communication/Configurations'
import { copyToClipboard } from '@/methods/copyToClipboard'
import { Side } from '@/store/CodeView.store'
import { rootStore } from '@/store/Root.store'

export const handleCopyToClipboard = (side: Side) => {
  const { windowsActiveTabs } = rootStore.CodeViewState

  if (windowsActiveTabs[side]) {
    console.log(windowsActiveTabs[side].jsonObject)
    copyToClipboard(windowsActiveTabs[side].jsonObject)
  }
}

export const toggleEditModeInTab = () => {
  rootStore.CodeViewState.toggleEditModeForCurrentlyFocusedWindow()
}

export const handleChangeConfig = async (side: Side) => {
  const { windowsActiveTabs } = rootStore.CodeViewState

  const res = await putConfiguration(windowsActiveTabs[side].jsonObject)

  if (res?.success) {
    rootStore.CodeViewState.updateTabValue({
      tabId: windowsActiveTabs[side].id,
      isEditing: false,
      shouldRefetchData: true,
    })
  }
}

export const handleDeleteConfig = async (side: Side) => {
  const { windowsActiveTabs } = rootStore.CodeViewState

  const id = windowsActiveTabs[side].id
  const configurationId = windowsActiveTabs[side].configurationId
  const type = windowsActiveTabs[side].type.capitalize()

  if (['Client', 'Entity'].includes(type)) {
    const res = await deleteConfiguration(configurationId)

    if (res?.success) {
      rootStore.CodeViewState.closeTab({ id })
      rootStore.CommunicationState.fetchConfigurationLists()
    }
  }
}
