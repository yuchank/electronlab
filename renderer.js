const { remote, ipcRenderer } = require('electron')
const { Menu } = remote
const ipc = ipcRenderer

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

const syncMsgBtn = document.querySelector('#sendSyncMsgBtn')

syncMsgBtn.addEventListener('click', () => {
  const reply = ipc.sendSync('synchronous-message', 'Mr. Watson, come here.')
  console.log(reply)
  const message = `Synchronous message reply: ${reply}`
  document.querySelector('#syncReply').innerHTML = message
})

const asyncMsgBtn = document.querySelector('#sendAsyncMsgBtn')

asyncMsgBtn.addEventListener('click', () => {
  ipc.send('asynchronous-message', `That's one small step for man`)
})

ipc.on('asynchronous-reply', (event, arg) => {
  const message = `Asynchronous message reply: ${arg}`
  document.querySelector('#asyncReply').innerHTML = message
})

// Video element where stream will be placed.
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

const mediaStreamConstraints = {
  video: true,
};

navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(gotLocalMediaStream).catch(handleLocalMediaStreamError);

// Sets the MediaStream as the video element src.
function gotLocalMediaStream(mediaStream) {
  localVideo.srcObject = mediaStream;
}

// Handles error by logging a message to the console with the error message.
function handleLocalMediaStreamError(error) {
  trace(`navigator.getUserMedia error: ${error.toString()}.`);
}