const {
  remote: {
    BrowserWindow
  },
  ipcRenderer
} = require('electron')

const DB = require('./controllers/users')

function $(el) {
  return document.querySelector(el)
}

window.$=$;

window.EB = {
  ipcRenderer,
  BrowserWindow,
  DB
}