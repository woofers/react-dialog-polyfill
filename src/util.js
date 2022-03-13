export const hasSupport = () => {
  if (typeof window === 'undefined') return false
  return !!window.HTMLDialogElement
}
