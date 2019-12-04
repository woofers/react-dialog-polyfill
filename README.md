

# React Dialog Polyfill

[![img](https://github.com/woofers/react-dialog-polyfill/workflows/build/badge.svg)](https://github.com/woofers/react-dialog-polyfill/actions) [![img](https://david-dm.org/woofers/react-dialog-polyfill.svg)](https://www.npmjs.com/package/react-dialog-polyfill) [![img](https://badge.fury.io/js/react-dialog-polyfill.svg)](https://www.npmjs.com/package/react-dialog-polyfill) [![img](https://img.shields.io/npm/dt/react-dialog-polyfill.svg)](https://www.npmjs.com/package/react-dialog-polyfill) [![img](https://img.shields.io/npm/l/react-dialog-polyfill.svg)](https://github.com/woofers/react-dialog-polyfill/blob/master/LICENSE)


# Installation

**Yarn**

    yarn add react-dialog-polyfill

**npm**

    npm install react-dialog-polyfill


# Usage

```jsx
import React from 'react'
import { Modal, Dialog } from 'react-dialog-polyfill'

const App = () => (
  <div>
    <Modal open={true} />
    <Dialog open={true} />
  </div>
)
```

Simply add the game widget to the React application using JSX.


## Props


### Open

`open` indicates if the modal is open. **Default:** `false`


### On Close

`onClose` runs when the modal is closed even when canceled. **Default:** `(event, modal) => {}`


### On Cancel

`onCancel` runs when the modal is closed using a canceling action such as `Escape`. **Default:** `(event, modal) => {}`
