import React, { forwardRef, createRef, useEffect, useState } from 'react'
import useInjectStyle from './use-inject-style'

// prettier-ignore
const style =
  `dialog:not([open])` + `{` +
    `display: none;` +
  `}`

const ModalBase = forwardRef((p, modal) => {
  const { children, open, ready, onCancel, onClose, useAsModal, ...rest } = p
  useInjectStyle(style)
  useEffect(() => {
    const self = modal.current
    if (!self || !ready || self.open === open) return
    const show = useAsModal ? () => self.showModal() : () => self.show()
    const close = () => self.close()
    const action = open ? show : close
    action()
  }, [ready, open, modal, useAsModal])
  const onCancelWrap = e => {
    e.preventDefault()
    onCancel(e, modal.current)
  }
  const onCloseWrap = e => {
    onClose(e, modal.current)
  }
  return (
    <dialog {...rest} ref={modal} onCancel={onCancelWrap} onClose={onCloseWrap}>
      {children}
    </dialog>
  )
})

ModalBase.defaultProps = {
  onClose: () => {},
  onCancel: () => {}
}

const hasSupport = () => {
  if (typeof window === 'undefined') return false
  return !!window.HTMLDialogElement
}

const loadPolyfill = () => {
  if (hasSupport()) return Promise.resolve()
  return import('dialog-polyfill')
}

const ModalWrapper = p => {
  const modal = createRef()
  const [ready, setReady] = useState()
  useEffect(() => {
    const self = modal.current
    if (ready || !self) return
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
  }, [modal, ready])
  return <ModalBase {...p} ready={ready} ref={modal} />
}

export const Modal = p => <ModalWrapper {...p} useAsModal={true} />

export const Dialog = p => <ModalWrapper {...p} useAsModal={false} />
