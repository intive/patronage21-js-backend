const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  gender: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, minlength: 9 },
  technologies: {
    type: [
      {
        type: String
      }
    ],
    required: true
  },
  password: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema)
