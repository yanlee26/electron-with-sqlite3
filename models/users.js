const db = require('../db');

const userSchema = {
  id: 'increments',
  name: {
    type: String,
    // primary: true
  },
  category: {
    type: String,
    defaultTo: 'backlog'
  },
  make: {
    type: String,
    defaultTo: 'Ford'
  },
  model: {
    type: String,
    nullable: false
  },
  age: Number,
//   updated_at: Date,
}

async function createUserTable() {
  const users = await db.model('User', userSchema)

  users.beforeUpdate(item => {
    // item.updated_at = new Date()
  })

  return users
}

// const users = await createUserTable()


module.exports = createUserTable