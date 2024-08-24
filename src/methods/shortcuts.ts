import { RootStore } from '@store/Root.store'

export const parseToKeyboardKeyDisplay = (key: string) => {
  switch (key) {
    case 'Escape':
      return 'Esc'
    case 'ArrowUp':
      return '↑'
    case 'ArrowDown':
      return '↓'
    case 'ArrowLeft':
      return '←'
    case 'ArrowRight':
      return '→'
    case 'Command':
      return '⌘'

    default:
      return key
  }
}

interface HandleShortcutsArgs {
  keyName: string
  e: KeyboardEvent
  store: RootStore
}

export const shortcutDescriptions = {
  'ctrl+s': 'Toggle split view',
  'ctrl+b': 'Toggle left sidebar',
  'ctrl+m': 'Toggle right sidebar',
  'ctrl+n': 'Create new configuration',
  'command+s': 'Toggle split view',
  'command+b': 'Toggle left sidebar',
  'command+m': 'Toggle right sidebar',
  'command+n': 'Create new configuration',
  Escape: 'Close modal',
}

export const SHORTCUTS = 'ctrl+s,ctrl+b,ctrl+m,ctrl+n,Escape'

export const handleShortcuts = ({ keyName, e, store }: HandleShortcutsArgs) => {
  e.preventDefault()

  switch (keyName) {
    case 'ctrl+s':
      store.CodeViewState.toggleHorizontalSplit()
      break
    case 'command+s':
      store.CodeViewState.toggleHorizontalSplit()
      break
    case 'ctrl+b':
      store.UserInterfaceState.toggleLeftSidebar()
      break
    case 'command+b':
      store.UserInterfaceState.toggleLeftSidebar()
      break

    case 'ctrl+m':
      store.UserInterfaceState.toggleRightSidebar()
      break
    case 'command+m':
      e.preventDefault()
      store.UserInterfaceState.toggleRightSidebar()
      break
    case 'ctrl+n':
      store.ModalState.openModal('add-configuration')
      break
    case 'command+n':
      store.ModalState.openModal('add-configuration')
      break
    case 'Escape':
      e.preventDefault()
      store.ModalState.closeAllModals()
      break
    default:
      break
  }
}
