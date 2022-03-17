import React, { Component, HTMLProps } from 'react'

// Might need to replace this with HTMLElement at some point
// as HTMLDialogElement is not widely supported and is now deprecated
type HTMLDialogBase = HTMLDialogElement

export interface HTMLDialog extends HTMLDialogBase {
  open: boolean
  returnValue: string
  close(returnValue?: string): void
  show(): void
  showModal(): void
}

type Callback = (e: Event, m: HTMLDialog) => void

interface DialogProps extends HTMLProps<HTMLDialogBase> {
  children?: React.ReactNode
  onClose?: Callback
}

interface ModalProps extends DialogProps {
  onCancel?: Callback
}

declare const Dialog: React.FC<DialogProps>
declare const Modal: React.FC<ModalProps>

export { Dialog, Modal }
