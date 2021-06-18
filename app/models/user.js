const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
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
  login: { type: String, required: true, unique: true },
  githubLink: { type: String, required: true },
  password: { type: String, required: true },
  activationCode: { type: String, validate: /\b[0-9]{8}$\b/, required: true },
  active: { type: Boolean, default: false }
})

module.exports = mongoose.model('User', userSchema)
