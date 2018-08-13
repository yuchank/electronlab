const { remote } = require('electron')
const { Menu } = remote

const ctxMenu = Menu.buildFromTemplate([
  { label: 'Cut', role: 'cut' },
  { label: 'Copy', role: 'copy' },
  { label: 'Paste', role: 'paste' },
  { label: 'Select All', role: 'selectall' },
  { type: 'separator' },
  { label: 'Custom', click() { console.log('Custom Menu') } }
])

window.addEventListener('contextmenu', (event) => {
  event.preventDefault()
  ctxMenu.popup({})
})