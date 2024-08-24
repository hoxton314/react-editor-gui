import { deleteGroup } from '@/communication/Groups'
import { deletePermission } from '@/communication/Permissions'
import { deleteUser, invalidateUserSession } from '@/communication/Users'
import { StoreContext } from '@/components/App'
import { observer } from 'mobx-react'
import { FC, useContext, useState } from 'react'
import { ActionsList, Button, CategoryTitle } from '../RightSidebar.styles'
import { toast } from 'react-toastify'

export const AccessManagement: FC = observer(() => {
  const store = useContext(StoreContext)
  const { currentlyFocusedWindow, windowsActiveTabs } = store.CodeViewState

  const focusedTab = windowsActiveTabs[currentlyFocusedWindow]

  const [isLogoutLoading, setIsLogoutLoading] = useState(false)

  const handleModalConfirmation = (e) => {
    e.stopPropagation()

    switch (focusedTab?.type) {
      case 'user':
        store.ModalState.setConfirmationModalData({
          operation: 'delete',
          highlightedText: focusedTab?.userData?.name,
          onConfirm: async () => {
            await deleteUser(focusedTab?.userData?.id)
          },
        })
        break
      case 'group':
        store.ModalState.setConfirmationModalData({
          operation: 'delete',
          highlightedText: focusedTab?.groupData?.name,
          onConfirm: async () => {
            await deleteGroup(focusedTab?.groupData?.id)
          },
        })
        break
      case 'permission':
        store.ModalState.setConfirmationModalData({
          operation: 'delete',
          highlightedText:
            focusedTab?.permissionData?.resourceName +
            '/' +
            focusedTab?.permissionData?.resourceType +
            '/' +
            focusedTab?.permissionData?.operation,
          onConfirm: async () => {
            await deletePermission(focusedTab?.permissionData)
          },
        })
        break
    }

    store.ModalState.openModal('confirmation')
  }

  const handleUserLogout = async () => {
    setIsLogoutLoading(true)

    const res = await invalidateUserSession(focusedTab?.userData?.id)
    if (res.success) {
      toast.success('User session invalidated')
    }

    setIsLogoutLoading(false)
  }

  return (
    <>
      <CategoryTitle>Actions</CategoryTitle>

      <ActionsList>
        <Button onClick={handleModalConfirmation}>Delete</Button>

        {focusedTab?.type === 'user' && (
          <Button onClick={handleUserLogout} disabled={isLogoutLoading}>
            Logout
          </Button>
        )}
      </ActionsList>
    </>
  )
})
