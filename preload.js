// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const {
  connect
} = require('trilogy')
const {
  BrowserWindow
} = require('electron').remote

const drag = require('electron-drag');

// Pass a query selector or a dom element to the function.
// Dragging the element will drag the whole window.
const db = connect('./store.db', {
  client: 'sql.js'
})

window.addEventListener('DOMContentLoaded', async () => {
  drag('body');
  const users = await db.model('users', {
    id: 'increments',
    name: String,
    comments: Number,
    admin: Boolean
  })

  await users.create({
    name: 'anon',
    comments: 0,
    admin: false
  })

  await users.create({
    name: 'boss',
    comments: 0,
    admin: true
  })

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }



  console.log(await users.findOne({
    name: 'anon'
  }))
  // -> { id: 1, name: 'anon', comments: 0, admin: false }

  console.log(await users.findOne({
    name: 'boss'
  }))
  // -> { id: 2, name: 'boss', comments: 0, admin: true }

  console.log(await users.count({
    admin: true
  }))

  // Minimize task
  document.getElementById("min-btn").addEventListener("click", (e) => {
    var window = BrowserWindow.getFocusedWindow();
    window.minimize();
  });

  // Maximize window
  document.getElementById("max-btn").addEventListener("click", (e) => {
    var window = BrowserWindow.getFocusedWindow();
    if (window.isMaximized()) {
      window.unmaximize();
    } else {
      window.maximize();
    }
  });

  // Close app
  document.getElementById("close-btn").addEventListener("click", (e) => {
    var window = BrowserWindow.getFocusedWindow();
    window.close();
  });
})