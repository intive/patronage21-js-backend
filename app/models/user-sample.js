const mongoose = require('mongoose')

const userSampleSchema = new mongoose.Schema({
  name: {
    type: String
  }
})

const UserSample = mongoose.model('UserSample', userSampleSchema)

module.exports = UserSample
