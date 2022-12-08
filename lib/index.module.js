import { Modal as ModalDev, Dialog as DialogDev } from './react-dialog-polyfill.module.dev.js'
import { Modal as ModalProd, Dialog as DialogProd } from './react-dialog-polyfill.module.js'

export const Modal = process.env.NODE_ENV === 'production' ? ModalProd : ModalDev

export const Dialog = process.env.NODE_ENV === 'production' ? DialogProd : DialogDev
