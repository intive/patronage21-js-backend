const User = require('../models/user')
const bcrypt = require('bcryptjs')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
require('ajv-errors')(ajv /*, {singleError: true} */)
ajv.addVocabulary(['swagger', 'info', 'basePath', 'tags', 'paths'])
const swaggerSchema = require('../../swagger.json')
ajv.addSchema(swaggerSchema, 'swagger.json')

const register = async (req, res, next) => {
  const errors = {
    fields: {},
    general: []
  }

  const {
    title,
    firstName,
    lastName,
    email,
    phone,
    technologies,
    login,
    githubLink,
    password: notHashedPassport
  } = req.body

  const validateUser = ajv.compile({ $ref: 'swagger.json#/definitions/User' })
  const valid = validateUser(req.body)
  if (!valid) {
    try {
      validateUser.errors.forEach(element => {
        if (element.instancePath === '') {
          const field = element.params.errors[0].params.missingProperty
          errors.fields[field] = [element.message]
        } else {
          const field = element.instancePath.split('/')[1]
          if (!errors.fields[field]) {
            errors.fields[field] = [element.message]
          } else {
            errors.fields[field].push(element.message)
          }
        }
      })
    } catch (err) {
      return res.status(500).send('Nieudana rejestracja').end()
    }
  }
  let existingEmail
  try {
    existingEmail = await User.findOne({
      email: email
    })
  } catch (err) {
    return res.status(500).send('Nieudana rejestracja').end()
  }

  let existingLogin
  try {
    existingLogin = await User.findOne({
      login: login
    })
  } catch (err) {
    return res.satus(500).send('Nieudana rejestracja').end()
  }

  if (existingEmail) {
    if (!errors.fields.email) {
      errors.fields.email = []
    }
    errors.fields.email.push('Email jest już zajęty')
  }

  if (existingLogin) {
    if (!errors.fields.login) {
      errors.fields.login = []
    }
    errors.fields.login.push('Login jest już zajęty')
  }

  if (Object.keys(errors.fields).length !== 0 || errors.general.length > 0) {
    return res.status(400).send(errors).end()
  }

  let password
  try {
    password = await bcrypt.hash(notHashedPassport, 12)
  } catch (err) {
    return res.status(500).send('Nieudana rejestracja').end()
  }
  let activationCode
  try {
    activationCode = await Math.floor(Math.random() * (99999999 - 10000000) + 10000000)
  } catch (err) {
    return res.status(500).send('Nieudana rejestracja').end()
  }

  const createdUser = new User({
    title,
    firstName,
    lastName,
    email,
    phone,
    technologies,
    login,
    password,
    githubLink,
    activationCode
  })

  try {
    await createdUser.save()
  } catch (err) {
    return res.status(500).send('Nieudana rejestracja').end()
  }

  createdUser.password = undefined

  res.status(200).send(createdUser).end()
}

exports.register = register
