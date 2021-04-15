const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: {
    type: String
  },
  active: {
    type: Boolean
  },
  activationKey: {
    type: Number
  }
})

const User = mongoose.model('UserSample', userSchema)

module.exports = User
