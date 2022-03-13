import { useEffect, useRef } from 'react'
import { hasSupport } from './util'

const hasDoc = () => typeof document !== 'undefined' && document.head

const useInjectStyle = (css, id = '_rdp') => {
  const style = useRef()
  useEffect(() => {
    if (!hasDoc() || hasSupport()) return
    style.current = document.createElement('style')
    style.current.innerHTML = css
    style.current.id = id
    document.head.appendChild(style.current)
    return () => {
      if (!hasDoc() || !style.current) return
      document.head.removeChild(style.current)
    }
  }, [css])
}

export default useInjectStyle
