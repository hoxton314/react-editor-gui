import { FC, useCallback, useState } from 'react'
import { Container, Aligner, LoginButton } from './LoginView.styles'
import { API_URL } from '../../constants/envs'
import { LoadingSpinner } from '@components/LoadingSpinner'

export const LoginView: FC = () => {
  const [redirecting, setRedirecting] = useState(false)

  const handleAuth = useCallback(() => {
    setRedirecting(true)

    window.location.href = `${API_URL}/redirect-to-auth`
  }, [])

  return (
    <Container>
      <Aligner>
        {redirecting ? (
          <LoadingSpinner height={'50px'} thickness={4} />
        ) : (
          <LoginButton onClick={handleAuth}>Login</LoginButton>
        )}
      </Aligner>
    </Container>
  )
}
