const User = require('../models/users');

class UsersCtl {
  async create(ctx = {
    name: 'foo',
    model: 'model',
    age: 12,
  }) {
    const user = await User();
    const value = ctx;

    return await user.create(value)
  }
  async remove(prop) {
    const user = await User();
    return await user.remove(prop)
  }

  async update(criteria, data) {
    const user = await User();
    console.log(criteria, data);

    return await user.update(criteria, data)
  }
  async clear() {
    const user = await User();
    return await user.clear()
  }
  async count(prop) {
    const user = await User();
    return await user.count(prop)
  }
  async find() {
    const user = await User();
    return await user.find()
  }
  async findOne(prop) {
    const user = await User();
    return await user.findOne(prop)
  }
}

module.exports = new UsersCtl();