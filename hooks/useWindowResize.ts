import { useEffect } from 'react'

export const widthBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
}

export function useWindowResize(widthBreakpoint: number, onBiggerWindow: () => void, onSmallerWindow: () => void) {
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth >= widthBreakpoint) onBiggerWindow()
      else onSmallerWindow()
    }
    resize()

    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widthBreakpoint])
}
