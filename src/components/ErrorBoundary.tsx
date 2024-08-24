import { Component, PropsWithChildren } from 'react'
import { STAGE } from '../constants/envs'
import { styled } from 'styled-components'
import { LoadingSpinner } from './LoadingSpinner'

const FallbackContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface ErrorBoundaryState {
  hasError: boolean
}

type Props = {
  children: React.ReactNode
}

export class ErrorBoundary extends Component<PropsWithChildren<Props>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<Props>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    if (STAGE === 'local') return
    console.error('Error caught by Error Boundary: ', error, info)

    // Clear localStorage and reload the page
    localStorage.clear()
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <FallbackContainer>
          <LoadingSpinner height="300px" thickness={4} />
        </FallbackContainer>
      )
    }

    return this.props.children
  }
}
