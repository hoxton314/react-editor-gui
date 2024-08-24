import { observer } from 'mobx-react'
import { FC, useContext } from 'react'
import { Side, Tab } from '@store/CodeView.store'
import { JSONEditor } from '@components/JSONEditor/JSONEditor'
import { StoreContext } from '@components/App'

interface JSONPreviewWindowProps {
  side: Side
}

export const JSONPreviewWindow: FC<JSONPreviewWindowProps> = observer(({ side }) => {
  const store = useContext(StoreContext)
  const { windowsActiveTabs } = store.CodeViewState
  const tabData = windowsActiveTabs[side] as Tab

  return <JSONEditor height="100%" width="100%" value={tabData?.jsonObject} />
})
