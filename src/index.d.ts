import React, { Props, Component, HTMLProps } from 'react'

type Callback = (e: Event, m: HTMLDialogElement) => void

interface DialogProps extends HTMLProps<HTMLDialogElement> {
  children?: React.ReactNode
  onCancel: Callback
  onClose: Callback
}

export type Dialog = React.FC<DialogProps>
export type Modal = React.FC<DialogProps>
