import { FC } from 'react'

interface HorizontalDotsIconProps {
  size?: number
}

export const HorizontalDotsIcon: FC<HorizontalDotsIconProps> = ({ size }) => {
  return (
    <svg width={size || '24'} height={size || '24'} viewBox="0 0 24 24" fill="none">
      <path
        d="M23.1213 9.87868C24.2929 11.0502 24.2929 12.9497 23.1213 14.1213C21.9497 15.2929 20.0502 15.2929 18.8787 14.1213C17.7071 12.9497 17.7071 11.0502 18.8787 9.87868C20.0502 8.70711 21.9497 8.70711 23.1213 9.87868Z"
        fill="currentColor"
      />
      <path
        d="M14.1213 9.87868C15.2929 11.0502 15.2929 12.9497 14.1213 14.1213C12.9497 15.2929 11.0502 15.2929 9.87868 14.1213C8.70711 12.9497 8.70711 11.0502 9.87868 9.87868C11.0502 8.70711 12.9497 8.70711 14.1213 9.87868Z"
        fill="currentColor"
      />
      <path
        d="M5.12131 9.87868C6.29288 11.0502 6.29288 12.9497 5.12131 14.1213C3.94974 15.2929 2.05024 15.2929 0.878676 14.1213C-0.292892 12.9497 -0.292892 11.0502 0.878676 9.87868C2.05024 8.70711 3.94974 8.70711 5.12131 9.87868Z"
        fill="currentColor"
      />
    </svg>
  )
}
