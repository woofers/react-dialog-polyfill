

# React Dialog Polyfill

[![img](https://github.com/woofers/react-dialog-polyfill/workflows/build/badge.svg)](https://github.com/woofers/react-dialog-polyfill/actions) [![img](https://david-dm.org/woofers/react-dialog-polyfill.svg)](https://www.npmjs.com/package/react-dialog-polyfill) [![img](https://badge.fury.io/js/react-dialog-polyfill.svg)](https://www.npmjs.com/package/react-dialog-polyfill) [![img](https://img.shields.io/npm/dt/react-dialog-polyfill.svg)](https://www.npmjs.com/package/react-dialog-polyfill) [![img](https://img.shields.io/npm/l/react-dialog-polyfill.svg)](https://github.com/woofers/react-dialog-polyfill/blob/master/LICENSE)

`<dialog>` element bundled with polyfill for React


# Why?

While many other more feature-rich React modal components exists, `react-dialog-polyfill`
aims to be a simple binding of the native `<dialog>` element for React.

Differences from most of the existing components:

-   Native browser support in browsers like Chrome and Opera
-   Polyfill for un-supported browsers
-   Avoids using `React.createPortal`, allowing SSR in natively supported browsers
-   Dialog always will display in-front of other elements regardless of `z-index`
-   Selected info from dialog can be returned via `<form>` element
-   Well suited for Electron apps


# Installation

**Yarn**

    yarn add react-dialog-polyfill

**npm**

    npm install react-dialog-polyfill


# Usage

```jsx
import React, { useState } from 'react'
import { Modal, Dialog } from 'react-dialog-polyfill'

const App = () => {
  const [dialog, setDialog] = useState(true)
  const [modal, setModal] = useState(true)
  return (
    <div>
      <Dialog open={dialog} onClose={(e, dialog) => alert('You closed the dialog')}>
        <div>This is a dialog. Click "Close".</div>
        <button onClick={() => setDialog(false)}>Close</button>
      </Dialog>
      <Modal open={modal}
        onCancel={(e, dialog) => {
          setModal(false)
          alert('You canceled the modal')
        }}
        onClose={(e, dialog) => {
          setModal(false)
          const value = dialog.returnValue
          if (value) alert(`You answered "${dialog.returnValue}" to the modal`)
        }}
      >
        <form method="dialog">
          <div>
            This is a modal.
            Press <pre style={{ display: 'inline-block' }}>Escape</pre> to cancel.
          </div>
          <div>Do you like modals?</div>
          <button type="submit" value="no">No</button>
          <button type="submit" value="yes" autoFocus>Yes</button>
        </form>
      </Modal>
    </div>
  )
}

export default App
```

Simply add the desired component to the React application using JSX.

The Modal component will block interaction with other elements when it is open, while the Dialog component will not.


## Props


### Open

`open` indicates if the modal is open. **Default:** `false`


### On Close

`onClose` runs when the modal is explicitly closed. **Default:** `(event, modal) => {}`

That is the `open` prop state is toggled from `true` to `false`.

This means that having `onCancel={() => setModal(false)}` will call `onClose` from within `onCancel`.


### On Cancel (Modal Only)

`onCancel` runs when the modal is canceled using `Escape`. **Default:** `(event, modal) => {}`

By default the modal itself will not close as `open` will still be set however the event will trigger.

It is recommended to set `onCancel={() => setModal(false)}` to have the modal close when `Escape` is pressed.
