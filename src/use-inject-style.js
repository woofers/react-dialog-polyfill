import { useEffect, useRef } from 'react'

const hasDoc = () => typeof document !== 'undefined' && document.head

const useInjectStyle = css => {
  const style = useRef()
  useEffect(() => {
    if (!hasDoc()) return
    style.current = document.createElement('style')
    style.current.innerHTML = css
    document.head.appendChild(style.current)
    return () => {
      if (!hasDoc() || !style.current) return
      document.head.removeChild(style.current)
    }
  }, [css])
}

export default useInjectStyle
