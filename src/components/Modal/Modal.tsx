import { observer } from 'mobx-react'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import { ModalCloseWrapper, ModalContainer, PageBlur } from './Modal.styles'

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
  width?: string
}

export const Modal: FC<ModalProps> = observer(({ onClose, children, width }) => {
  return createPortal(
    <PageBlur
      onMouseDown={(e) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <ModalContainer $width={width}>
        <ModalCloseWrapper onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path
              d="M8.73436 0.265556C8.38006 -0.0885186 7.80592 -0.0885186 7.45173 0.265556L4.47835 3.23891L1.54827 0.308606C1.19408 -0.0454687 0.619942 -0.0454687 0.265638 0.308606C-0.0885459 0.662922 -0.0885459 1.23708 0.265638 1.59128L3.19572 4.52146L0.308686 7.4086C-0.0454974 7.76291 -0.0454974 8.33708 0.308686 8.69127C0.485838 8.86831 0.71789 8.95683 0.950062 8.95683C1.18211 8.95683 1.41429 8.86831 1.59144 8.69127L4.47835 5.80426L7.40844 8.73444C7.58559 8.91148 7.81764 9 8.04982 9C8.28187 9 8.51404 8.91148 8.69119 8.73444C9.04538 8.38013 9.04538 7.80596 8.69119 7.45177L5.76111 4.52158L8.73436 1.54823C9.08855 1.19391 9.08855 0.619751 8.73436 0.265556Z"
              fill="currentColor"
            />
          </svg>
        </ModalCloseWrapper>
        {children}
      </ModalContainer>
    </PageBlur>,
    document.body,
  )
})
