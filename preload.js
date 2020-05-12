// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { connect } = require('trilogy')


const db = connect('./store.db', {
  client: 'sqlite3'
})
window.addEventListener('DOMContentLoaded', async() => {
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



  console.log(await users.findOne({ name: 'anon' }))
  // -> { id: 1, name: 'anon', comments: 0, admin: false }

  console.log(await users.findOne({ name: 'boss' }))
  // -> { id: 2, name: 'boss', comments: 0, admin: true }

  console.log(await users.count({ admin: true }))
})
