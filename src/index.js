import React, { forwardRef, createRef, useEffect, useState } from 'react'

const hasSupport = () =>
  typeof window !== 'undefined' && !!window.HTMLDialogElement
const hasDoc = () => typeof document !== 'undefined' && document.head

let uses = 0
const id = '_rdp'

// biome-ignore format: Keeps CSS formatted
const css =
  `dialog:not([open])` + `{` +
    `display: none;` +
  `}`

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

const ModalBase = forwardRef(
  ({ onClose = () => {}, onCancel = () => {}, ...p }, modal) => {
    const { children, open, _rd, _md, ...rest } = p
    useInjectStyle()
    useEffect(() => {
      const self = modal.current
      if (!self || !_rd || self.open === open) return
      const show = _md ? () => self.showModal() : () => self.show()
      const close = () => self.close()
      const action = open ? show : close
      action()
    }, [_rd, open, modal, _md])
    const onCancelWrap = e => {
      e.preventDefault()
      onCancel(e, modal.current)
    }
    const onCloseWrap = e => {
      onClose(e, modal.current)
    }
    return (
      <dialog
        {...rest}
        ref={modal}
        onCancel={onCancelWrap}
        onClose={onCloseWrap}
      >
        {children}
      </dialog>
    )
  }
)

const loadPolyfill = () =>
  hasSupport() ? Promise.resolve() : import('dialog-polyfill')

const ModalWrapper = p => {
  const modal = createRef()
  const [_rd, setReady] = useState()
  useEffect(() => {
    const self = modal.current
    if (_rd || !self) return
    let subscribed = true
    loadPolyfill()
      .then(polyfill => {
        if (!polyfill) return
        polyfill.default.registerDialog(self)
      })
      .catch(err => {
        if (__isDev__) {
          console.warn(`dialog-polyfill could not be loaded`, err)
        }
      })
      .finally(() => {
        if (subscribed) setReady(true)
      })
    return () => (subscribed = false)
  }, [modal, _rd])
  return <ModalBase {...p} _rd={_rd} ref={modal} />
}

export const Modal = p => <ModalWrapper {...p} _md={true} />

export const Dialog = p => <ModalWrapper {...p} _md={false} />
