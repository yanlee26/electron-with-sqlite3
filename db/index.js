const {
  connect
} = require('trilogy');

const db = connect('./store.db', {
  client: 'sql.js'
})

module.exports = db;