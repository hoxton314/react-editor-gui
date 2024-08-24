import { FC } from 'react'

interface AddIconProps {
  size?: number
}

export const AddIcon: FC<AddIconProps> = ({ size }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || '24'} height={size || '24'} viewBox="0 0 16 16" fill="none">
      <path
        d="M14 6.5H9.5V2C9.5 1.44781 9.05219 1 8.5 1H7.5C6.94781 1 6.5 1.44781 6.5 2V6.5H2C1.44781 6.5 1 6.94781 1 7.5V8.5C1 9.05219 1.44781 9.5 2 9.5H6.5V14C6.5 14.5522 6.94781 15 7.5 15H8.5C9.05219 15 9.5 14.5522 9.5 14V9.5H14C14.5522 9.5 15 9.05219 15 8.5V7.5C15 6.94781 14.5522 6.5 14 6.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
