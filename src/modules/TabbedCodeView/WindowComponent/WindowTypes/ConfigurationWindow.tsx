import { observer } from 'mobx-react'
import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { Side, Tab } from '@store/CodeView.store'
import { JSONEditor } from '@components/JSONEditor/JSONEditor'
import { getConfiguration } from '@communication/Configurations'
import { StoreContext } from '@components/App'
import { ContentLoader } from '../../TabbedCodeView.styles'
import { checkIfUserCanEditResource, checkIfUserCanDeleteResource } from '@communication/Permissions'
import { LifecycleState } from '@/types/General'
import { TabError } from '../TabError/TabError'

interface ClientWindowProps {
  side: Side
}

export const ClientWindow: FC<ClientWindowProps> = observer(({ side }) => {
  const store = useContext(StoreContext)
  const { windowsActiveTabs } = store.CodeViewState
  const tabData = useMemo(() => windowsActiveTabs[side] as Tab, [windowsActiveTabs, side])

  const [lifecycleState, setLifecycleState] = useState<LifecycleState>('init')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const fetchClient = async () => {
    setLifecycleState('fetching')
    const res = await getConfiguration(tabData?.configurationId)

    if (res?.success) {
      store.CodeViewState.setTabConfigurationData({ tabId: tabData?.id, configurationData: res?.data })
      store.CodeViewState.updateTabValue({ tabId: tabData?.id, shouldRefetchData: false })
      setEditorKey((prev) => prev + 1)
      setLifecycleState('fetched')
    } else {
      setErrorMessage(res?.error?.message || 'Failed to fetch client')
      setLifecycleState('error')
    }
  }

  const refreshTab = async () => {
    await fetchClient()
    setEditorKey((prev) => prev + 1)
  }

  const checkEditRights = async () => {
    const canEditRes = await checkIfUserCanEditResource(tabData?.configurationId)
    if (canEditRes?.data?.authorized) {
      store.CodeViewState.updateTabValue({ tabId: tabData?.id, hasEditRights: true })
    }
  }

  const checkDeleteRights = async () => {
    const canDelete = await checkIfUserCanDeleteResource(tabData?.configurationId)
    if (canDelete?.data?.authorized) {
      store.CodeViewState.updateTabValue({ tabId: tabData?.id, hasDeleteRights: true })
    }
  }

  useEffect(() => {
    if (tabData?.configurationData?.current?.configurationId && tabData?.configurationId) {
      setEditorKey((prev) => prev + 1)
      setLifecycleState('fetched')
    } else if (tabData?.configurationId) {
      fetchClient()
      checkEditRights()
      checkDeleteRights()
    } else {
      setErrorMessage('Client ID not found')
      setLifecycleState('error')
    }
  }, [tabData?.configurationId, tabData?.configurationData?.current?.configurationId, tabData?.id])

  const handleJSONEditorChange = (e, val) => {
    if (val) {
      store.CodeViewState.setTabJsonData({ tabId: tabData?.id, jsonObject: val })
    }
  }

  const [editorKey, setEditorKey] = useState(0)

  useEffect(() => {
    setEditorKey((prev) => prev + 1)
  }, [tabData?.isEditing])

  useEffect(() => {
    if (tabData?.shouldRefetchData) {
      refreshTab()
    }
  }, [tabData?.shouldRefetchData])

  const JSONPropIconOnclick = (propertyToPreviewPathName: string) => {
    let baseString = 'current/'
    if (propertyToPreviewPathName === 'current') {
      baseString = ''
    }

    const refMap = tabData?.configurationData?.referenceMapping as Array<{
      unresolvedPath: string
      resolvedValue: object
    }>

    const jsonObject = JSON.stringify(
      refMap.find((item) => item.unresolvedPath === baseString + propertyToPreviewPathName)?.resolvedValue,
      null,
      4,
    )

    store.CodeViewState.addTab({
      tab: {
        type: 'json-preview',
        title: propertyToPreviewPathName,
        jsonObject,
      },
      side: side,
    })
  }

  switch (lifecycleState) {
    case 'init':
      return <></>
    case 'fetching':
      return <ContentLoader type="code" />
    case 'fetched':
      return (
        <JSONEditor
          key={editorKey}
          height="100%"
          width="100%"
          value={tabData?.jsonObject}
          onChange={tabData?.isEditing ? handleJSONEditorChange : undefined}
          widgetOnClick={JSONPropIconOnclick}
          widgetPropNameList={tabData?.configurationData?.referenceMapping?.map((item) => item.unresolvedPath)}
        />
      )
    case 'error':
      return (
        <TabError endpoint={'/configuration'} resourceType={tabData?.configurationId} errorMessage={errorMessage} />
      )
  }
})
