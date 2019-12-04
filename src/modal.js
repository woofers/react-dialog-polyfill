import React, { forwardRef, createRef, useEffect, useState } from 'react'

const ModalBase = forwardRef((p, modal) => {
  const {
    children,
    open,
    ready,
    onCancel,
    onClose,
    useAsModal,
    ...rest
  } = p
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
    <dialog {...rest}
     ref={modal}
     onCancel={onCancelWrap}
     onClose={onCloseWrap}
    >
      {children}
    </dialog>
  )
})

ModalBase.defaultProps = {
  onClose: () => {},
  onCancel: () => {}
}

const ModalWrapper = p => {
  const modal = createRef()
  const [ready, setReady] = useState()
  useEffect(() => {
    if (ready) return
    import('dialog-polyfill').then(polyfill => {
      const self = modal.current
      polyfill.default.registerDialog(self)
    })
    .catch(err => console.warn(`dialog-polyfill was not loaded`))
    .finally(() => setReady(true))
  }, [modal, ready])
  return <ModalBase {...p} ready={ready} ref={modal} />
}

export const Modal = p => <ModalWrapper {...p} useAsModal={true} />

export const Dialog = p => <ModalWrapper {...p} useAsModal={false} />
