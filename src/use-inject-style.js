import { useEffect } from 'react'
import { hasSupport } from './util'
import css from './styles'

let uses = 0
const id = '_rdp'

const hasDoc = () => typeof document !== 'undefined' && document.head

const useInjectStyle = () => {
  useEffect(() => {
    if (!hasDoc() || hasSupport()) return
    if (uses <= 0) {
      const style = document.createElement('style')
      style.innerHTML = css
      style.id = id
      document.head.appendChild(style)
    }
    uses++
    return () => {
      uses--
      if (!hasDoc() || uses > 0) return
      const element = document.getElementById(id)
      if (element) document.head.removeChild(element)
    }
  }, [])
}

export default useInjectStyle
