const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  id: {
    type: Number
  },
  active: {
    type: Boolean
  },
  activationCode: {
    type: Number
  }
})

const User = mongoose.model('UserSample', userSchema)

module.exports = User
