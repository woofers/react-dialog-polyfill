import { useEffect } from 'react'
import { hasSupport } from './util'

let uses = 0
const id = '_rdp'

const hasDoc = () => typeof document !== 'undefined' && document.head
const loadStyles = () => import('./styles').then(({ css }) => css)

const useInjectStyle = () => {
  useEffect(() => {
    if (!hasDoc() || hasSupport()) return
    if (uses <= 0) {
      let cancel = false
      const injectStyle = async () => {
        const style = document.createElement('style')
        let css = ''
        try {
          css = await loadStyles()
        } catch (e) {
          cancel = true
        }
        style.innerHTML = css
        style.id = id
        if (!cancel) document.head.appendChild(style)
      }
      injectStyle()
    }
    uses++
    return () => {
      uses--
      if (!hasDoc() || uses > 0) return
      cancel = true
      const element = document.getElementById(id)
      if (element) document.head.removeChild(element)
    }
  }, [])
}

export default useInjectStyle
