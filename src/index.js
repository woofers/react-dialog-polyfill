import React, { forwardRef, createRef, useEffect, useState } from 'react'
import useInjectStyle from './use-inject-style'
import { hasSupport } from './util'

const ModalBase = forwardRef((p, modal) => {
  const { children, open, _rd, onCancel, onClose, _md, ...rest } = p
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
