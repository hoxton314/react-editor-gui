import { FC, useCallback, useContext } from 'react'
import { MenuMain, MenuNav, MenuFooter, MenuWrapper, MenuItem } from './Menu.styles'
import { StoreContext } from '@components/App'
import { observer } from 'mobx-react'
import { axiosInstance } from '@methods/axiosConfig'
import { BugsIcon, ConfigurationsIcon, LogoutIcon, PermissionsIcon, SettingsIcon, ToolsIcon } from './MenuIcons'
import { handleTooltip, closeTooltip } from '@/components/Tooltip/Tooltip'
import { ThemeStatus } from './ThemeStatus'

export const Menu: FC = observer(() => {
  const store = useContext(StoreContext)
  const { selectedThemeNames } = store.ThemeState
  const { selectedMenuTab } = store.UserInterfaceState
  const { capabilitiesComputed } = store.CommunicationState
  const { isAllowedToManageConfig, isAllowedToManageAccess } = capabilitiesComputed

  const logout = useCallback(async () => {
    await axiosInstance.get(`logout`)
    store.CommunicationState.logout()
  }, [])

  return (
    <MenuWrapper>
      <MenuMain>
        <MenuNav>
          {isAllowedToManageConfig && (
            <MenuItem
              $active={selectedMenuTab === 'configurations'}
              onClick={() => store.UserInterfaceState.setSelectedMenuTab('configurations')}
              onMouseEnter={(e) => handleTooltip(e, 'Configurations', -4)}
              onMouseLeave={closeTooltip}
            >
              <ConfigurationsIcon />
            </MenuItem>
          )}

          {isAllowedToManageAccess && (
            <MenuItem
              $active={selectedMenuTab === 'permissions'}
              onClick={() => store.UserInterfaceState.setSelectedMenuTab('permissions')}
              onMouseEnter={(e) => handleTooltip(e, 'Access management', -4)}
              onMouseLeave={closeTooltip}
            >
              <PermissionsIcon />
            </MenuItem>
          )}

          <MenuItem
            $active={selectedMenuTab === 'tools'}
            onClick={() => store.UserInterfaceState.setSelectedMenuTab('tools')}
            onMouseEnter={(e) => handleTooltip(e, 'Tools', -4)}
            onMouseLeave={closeTooltip}
          >
            <ToolsIcon />
          </MenuItem>

          <MenuItem
            $active={selectedMenuTab === 'bugs'}
            onClick={() => store.UserInterfaceState.setSelectedMenuTab('bugs')}
            onMouseEnter={(e) => handleTooltip(e, 'Bug report', -4)}
            onMouseLeave={closeTooltip}
          >
            <BugsIcon />
          </MenuItem>
        </MenuNav>

        {/* --- TOP / BOTTOM --- */}

        <MenuFooter>
          <MenuItem
            onClick={() => {
              store.ThemeState.cycleTheme()
            }}
            onMouseEnter={(e) => handleTooltip(e, selectedThemeNames?.length > 2 ? 'Next theme' : 'Toggle theme', -4)}
            onMouseLeave={closeTooltip}
          >
            <ThemeStatus />
          </MenuItem>

          <MenuItem
            $active={selectedMenuTab === 'settings'}
            onClick={() => store.UserInterfaceState.setSelectedMenuTab('settings')}
            onMouseEnter={(e) => handleTooltip(e, 'Settings', -4)}
            onMouseLeave={closeTooltip}
          >
            <SettingsIcon />
          </MenuItem>

          <MenuItem onClick={logout} onMouseEnter={(e) => handleTooltip(e, 'Logout', -4)} onMouseLeave={closeTooltip}>
            <LogoutIcon />
          </MenuItem>
        </MenuFooter>
      </MenuMain>
    </MenuWrapper>
  )
})
