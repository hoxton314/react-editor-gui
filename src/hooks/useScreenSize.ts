import { useState, useEffect } from 'react'

export const useScreenSize = () => {
  const [width, setWidth] = useState(window.screen.width)
  const [height, setHeight] = useState(window.screen.height)

  useEffect(() => {
    const updateDimension = () => {
      setWidth(window.screen.width)
      setHeight(window.screen.height)
    }

    window.addEventListener('resize', updateDimension)

    return () => {
      window.removeEventListener('resize', updateDimension)
    }
  }, [])

  return { width, height }
}
