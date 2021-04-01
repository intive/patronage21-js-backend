const mongoose = require('mongoose')

const userSampleSchema = new mongoose.Schema({
  name: {
    type: String
  }
})

const UserSample = mongoose.model('User', userSampleSchema)

module.exports = UserSample
