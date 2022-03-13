import React, { forwardRef, createRef, useEffect, useState } from 'react'
import useInjectStyle from './use-inject-style'
import { hasSupport } from './util'

// prettier-ignore
const style =
  `dialog:not([open])` + `{` +
    `display: none;` +
  `}`

const ModalBase = forwardRef((p, modal) => {
  const { children, open, _ready, onCancel, onClose, _useAsModal, ...rest } = p
  useInjectStyle(style)
  useEffect(() => {
    const self = modal.current
    if (!self || !_ready || self.open === open) return
    const show = _useAsModal ? () => self.showModal() : () => self.show()
    const close = () => self.close()
    const action = open ? show : close
    action()
  }, [_ready, open, modal, _useAsModal])
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

const loadPolyfill = () => {
  if (hasSupport()) return Promise.resolve()
  return import('dialog-polyfill')
}

const ModalWrapper = p => {
  const modal = createRef()
  const [_ready, setReady] = useState()
  useEffect(() => {
    const self = modal.current
    if (_ready || !self) return
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
  }, [modal, _ready])
  return <ModalBase {...p} _ready={_ready} ref={modal} />
}

export const Modal = p => <ModalWrapper {...p} _useAsModal={true} />

export const Dialog = p => <ModalWrapper {...p} _useAsModal={false} />
