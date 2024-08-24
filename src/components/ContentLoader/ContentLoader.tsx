import { FC } from 'react'
import { ContentLoaderSkeleton } from './ContentLoader.styles'
import { useTheme } from 'styled-components'

interface ContentLoaderProps {
  type?: 'list' | 'code'
  width?: string
  height?: string
  speed?: number
  backgroundColor?: string
  foregroundColor?: string
}

export const ContentLoader: FC<ContentLoaderProps> = (props) => {
  const theme = useTheme()

  const renderBody = () => {
    switch (props.type) {
      case 'list':
        return (
          <>
            <rect x="0" y="0" rx="12" ry="12" width="15" height="15" />
            <rect x="30" y="0" rx="8" ry="8" width="calc(100% - 30px)" height="15" />
            <rect x="0" y="30" rx="12" ry="12" width="15" height="15" />
            <rect x="30" y="30" rx="8" ry="8" width="calc(100% - 30px)" height="15" />
            <rect x="0" y="60" rx="12" ry="12" width="15" height="15" />
            <rect x="30" y="60" rx="8" ry="8" width="calc(100% - 30px)" height="15" />
            <rect x="0" y="90" rx="12" ry="12" width="15" height="15" />
            <rect x="30" y="90" rx="8" ry="8" width="calc(100% - 30px)" height="15" />
          </>
        )
      case 'code':
        return (
          <>
            <rect x="0" y="0" rx="8" ry="8" width="86" height="18" />
            <rect x="96" y="0" rx="8" ry="8" width="170" height="18" />

            <rect x="43" y="30" rx="8" ry="8" width="394" height="18" />
            <rect x="448" y="30" rx="8" ry="8" width="87" height="18" />

            <rect x="43" y="60" rx="8" ry="8" width="249" height="18" />
            <rect x="317" y="60" rx="8" ry="8" width="249" height="18" />
            <rect x="584" y="60" rx="8" ry="8" width="52" height="18" />

            <rect x="0" y="90" rx="8" ry="8" width="86" height="18" />
          </>
        )
      default:
        return <></>
    }
  }

  return (
    <ContentLoaderSkeleton
      speed={2}
      width={'100%'}
      height={'100%'}
      backgroundColor={theme.colors['dropdown.border']}
      foregroundColor={theme.colors['editor.background']}
      {...props}
    >
      {renderBody()}
    </ContentLoaderSkeleton>
  )
}
