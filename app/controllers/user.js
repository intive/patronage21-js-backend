const {
  validationResult
} = require('express-validator')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const register = async (req, res, next) => {
  const errors = {
    fields: {},
    general: []
  }
  const ValidateErrors = validationResult(req)
  if (!ValidateErrors.isEmpty()) {
    ValidateErrors.errors.forEach(error => {
      if (!errors.fields[error.param]) {
        errors.fields[error.param] = []
      }
      errors.fields[error.param].push(error.msg)
    })
    return res.status(400).send(errors).end()
  }

  const {
    gender,
    name,
    surname,
    email,
    phone,
    technologies,
    password: notHashedPassport
  } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({
      email: email
    })
  } catch (err) {
    return res.status(500).send('Nieudana rejestracja').end()
  }

  if (existingUser) {
    if (!errors.fields.email) {
      errors.fields.email = []
    }
    errors.fields.email.push('Email jest już zajęty')
    return res.status(400).send(errors).end()
  }

  let password
  try {
    password = await bcrypt.hash(notHashedPassport, 12)
  } catch (err) {
    return res.status(500).send('Nieudana rejestracja').end()
  }

  const createdUser = new User({
    gender,
    name,
    surname,
    email,
    phone,
    technologies,
    password
  })

  try {
    await createdUser.save()
  } catch (err) {
    return res.status(500).send('Nieudana rejestracja').end()
  }

  res.status(200).end()
}

exports.register = register
