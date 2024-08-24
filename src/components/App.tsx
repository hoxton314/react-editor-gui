import React, { createContext, useContext, useEffect } from 'react'
import Hotkeys from 'react-hot-keys'
import { ThemeProvider } from 'styled-components'

import { rootStore } from '@store/Root.store'
import { Toasts } from './Toast/Toast'

import { observer } from 'mobx-react'
import { AppContainer, GlobalStyle } from '@styles/App.styles'

import { Helmet } from './Helmet'
import { MainGrid } from '@modules/MainGrid/MainGrid'
import { LoginView } from '@modules/LoginView/LoginView'
import { ContextMenu, onContextMenu } from './ContextMenu/ContextMenu'

import { ModalHandler } from './ModalHandler/ModalHandler'
import { ErrorBoundary } from './ErrorBoundary'
import { Tooltip } from './Tooltip/Tooltip'
import { handleShortcuts, SHORTCUTS } from '@methods/shortcuts'

export const StoreContext = createContext(rootStore)

export const App: React.FC = observer(() => {
  const store = useContext(StoreContext)
  const { initialAuthCheck, isAuthenticated, capabilitiesComputed } = store.CommunicationState
  const { resolvedThemeObject } = rootStore.ThemeState

  // useEffect(() => {
  //   store.CommunicationState.checkLogin()
  // }, [])

  // useEffect(() => {
  //   if (initialAuthCheck && isAuthenticated) {
  //     store.CommunicationState.fetchConfigurationLists()
  //   }
  // }, [initialAuthCheck, isAuthenticated])

  // useEffect(() => {
  //   if (capabilitiesComputed.isAllowedToManageAccess && isAuthenticated) {
  //     store.CommunicationState.fetchAllAccessManagementLists()
  //     store.CommunicationState.fetchAllDataForInputs()
  //   }
  // }, [isAuthenticated, capabilitiesComputed])

  useEffect(() => {
    console.log('App mounted', process.env.DEV_MODE)
    console.log('App mounted', process.env.STAGE)
    console.log('App mounted', process.env)
  })

  return (
    <StoreContext.Provider value={rootStore}>
      <Helmet title="React Editor" description="React Editor" themeColor="#000000" />

      <ThemeProvider theme={resolvedThemeObject}>
        <ErrorBoundary>
          <Hotkeys keyName={SHORTCUTS} onKeyDown={(keyName, e) => handleShortcuts({ keyName, e, store: store })}>
            <GlobalStyle />
            <AppContainer
              className="app-container"
              onContextMenu={onContextMenu}
              onDragEnter={(e) => {
                e.preventDefault()
              }}
              onDragOver={(e) => {
                e.preventDefault()
                // when no e.stopPropagation() is called
                // the dragover event will bubble up to the parent
                // knowing no tab is under the cursor
                store.CodeViewState.setHoveringOverTabId('')
              }}
            >
              <Toasts />
              <ModalHandler />
              <ContextMenu />
              <Tooltip />

              {/* {isAuthenticated && initialAuthCheck ? <MainGrid /> : <LoginView />} */}
              <MainGrid />
            </AppContainer>
          </Hotkeys>
        </ErrorBoundary>
      </ThemeProvider>
    </StoreContext.Provider>
  )
})
