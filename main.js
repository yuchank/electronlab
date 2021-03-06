const { app, BrowserWindow, Menu, ipcMain } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electronjs.org') }
      },
      {
        label: 'Documentation',
        click () { require('electron').shell.openExternal('https://github.com/electron/electron/tree/v2.0.7/docs#readme') }
      },
      {
        label: 'Community Discussions',
        click () { require('electron').shell.openExternal('https://discuss.atom.io/c/electron') }
      },
      {
        label: 'Search Issues',
        click () { require('electron').shell.openExternal('https://github.com/electron/electron/issues') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Edit menu
  template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

if (process.platform === 'win32') {
  template.unshift({
    label: 'File',
    submenu: [
      {role: 'quit'}
    ]
  })
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

function createWindow() {
  // Create the browser window. (renderder process)
  win = new BrowserWindow({ 
    show: false,              // default: true
    // backgroundColor: '#FFF',  // default: '#FFF'
    width: 800,               // default: 800
    height: 600,              // default: 600
    // minWidth: 800,            // default: 0
    // maxWidth: 1024,           // default: UNLIMITED
    // minHeight: 600,           // default: 0
    // maxHeight: 768,           // default: UNLIMITED
    // resizable: true,          // default: true
    // movable: true,            // default: true
    // alwaysOnTop: false,       // default: false
    // title: 'Goodbye, Moon?',  // default: 'Electron'
    // frame: false,             // default: true
    // titleBarStyle: 'hidden',  // default: 'default' macOS only
    // transparent: true         // default: false
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Wait for 'ready-to-show' to display our window
  win.once('ready-to-show', () => {
    win.show()
  })

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const ipc = ipcMain

ipc.on('synchronous-message', (event, arg) => {
  event.returnValue = 'I heard you!'
})

ipc.on('asynchronous-message', (event, arg) => {
  if (arg === `That's one small step for man`) {
    event.sender.send('asynchronous-reply', ', one giant leap for mankind.')
  }
})
