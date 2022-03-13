
// prettier-ignore
const main =
  'dialog' + '{' +
    'position: absolute;' +
    'left: 0;' +
    'right: 0;' +
    'width: -moz-fit-content;' +
    'width: -webkit-fit-content;' +
    'width: fit-content;' +
    'height: -moz-fit-content;' +
    'height: -webkit-fit-content;' +
    'height: fit-content;' +
    'margin: auto;' +
    'border: solid;' +
    'padding: 1em;' +
    'background: white;' +
    'color: black;' +
    'display: block;' +
 '}'

// prettier-ignore
const hide =
  `dialog:not([open])` + `{` +
    `display: none;` +
  `}`

// prettier-ignore
const backdrop =
  'dialog + .backdrop' + '{' +
    'position: fixed;' +
    'top: 0;' +
    'right: 0;' +
    'bottom: 0;' +
    'left: 0;' +
    'background: rgba(0,0,0,0.1);' +
  '}'

const css = `${main} ${hide} ${backdrop}`

export default css
