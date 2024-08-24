import React, { FC } from 'react'
import { StyledToasts } from './Toast.styles'
import { ToastContainer } from 'react-toastify'

export const Toasts: FC = () => {
  return (
    <StyledToasts>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={'light'}
      />
    </StyledToasts>
  )
}
