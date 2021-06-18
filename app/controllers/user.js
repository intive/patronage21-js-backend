const User = require('../models/user')
const generateActivationCode = require('../utils/activationCodeGenerator')
const emailSender = require('../services/mail-sender')
const bcrypt = require('bcryptjs')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const javaIntegration = require('../utils/javaIntegration')
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
    firstName,
    lastName,
    title,
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
      errors.general.push('Nieudana rejestracja')
      return res.status(500).send(errors).end()
    }
  }

  let existingEmail
  try {
    existingEmail = await User.findOne({
      email: email
    })
  } catch (err) {
    errors.general.push('Nieudana rejestracja')
    return res.status(500).send(errors).end()
  }

  let existingLogin
  try {
    existingLogin = await User.findOne({
      login: login
    })
  } catch (err) {
    errors.general.push('Nieudana rejestracja')
    return res.status(500).send(errors).end()
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
    errors.general.push('Nieudana rejestracja')
    return res.status(500).send(errors).end()
  }

  let activationCode
  try {
    activationCode = generateActivationCode()
  } catch (err) {
    errors.general.push('Nieudana rejestracja')
    return res.status(500).send(errors).end()
  }

  const gender = (title === 'Pan') ? 'MALE' : 'FEMALE'

  const createdUser = new User({
    firstName,
    lastName,
    email,
    gender,
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
    errors.general.push('Nieudana rejestracja')
    return res.status(500).send(errors).end()
  }

  // * send an e-mail template
  emailSender.send(createdUser.email, createdUser.activationCode)

  createdUser.password = undefined
  createdUser.activationCode = undefined
  createdUser.__v = undefined

  res.status(200).send(createdUser).end()
}

const activateUser = async (req, res) => {
  const errors = {
    fields: {},
    general: []
  }

  const validateUser = ajv.compile({ $ref: 'swagger.json#/definitions/activationData' })
  const valid = validateUser(req.body)

  if (!valid) {
    try {
      validateUser.errors.forEach(element => {
        if (element.instancePath === '') {
          const field = element.params.errors[0].params.missingProperty
          errors.fields[field] = element.message
        } else {
          const field = element.instancePath.slice(1)
          if (!errors.fields.field) {
            errors.fields[field] = element.message
          } else {
            errors.fields[field].push(element.message)
          }
        }
      })
      return res.status(400).send(errors).end()
    } catch (err) {
      errors.general.push('Nieudana rejestracja')
      return res.status(500).send(errors).end()
    }
  }

  const {
    email,
    activationCode
  } = req.body

  try {
    await User.where({ email: email }).findOne((error, existingUser) => {
      if (error) {
        errors.general.push('Nieudana aktywacja')
        return res.status(500).send(errors).end()
      }
      if (!existingUser) {
        errors.general.push('Użytkownik nie istnieje')
        return res.status(404).send(errors).end()
      }
      if (existingUser) {
        if (existingUser.active === true) {
          errors.general.push('Użytkownik jest już aktywny')
          return res.status(409).send(errors).end()
        } else if (existingUser.activationCode !== activationCode) {
          errors.general.push('Błędny kod')
          return res.status(409).send(errors).end()
        } else if (existingUser.activationCode === activationCode) {
          try {
            User.where({ email: email }).update({ $set: { active: true } }, () => {
              // java integration happens here
              javaIntegration.sendUser(User)
              errors.general.push('Aktywacja udana')
              res.status(200).send(errors).end()
            })
          } catch (err) {
            errors.general.push('Nieudana aktywacja')
            return res.status(500).send(errors).end()
          }
        }
      }
    })
  } catch (err) {
    errors.general.push('Nieudana aktywacja')
    return res.status(500).send(errors).end()
  }
}

const listOfUsers = async (req, res) => {
  const errors = {
    fields: {},
    general: []
  }

  try {
    const active = req.query.active
    let users
    if (active === 'true') {
      users = await User.find({ active: true })
    } else {
      users = await User.find({})
    }

    users.forEach(user => {
      user.password = undefined
      user.__v = undefined
      user.activationCode = undefined
    })

    return res.status(200).send(users).end()
  } catch (err) {
    errors.general.push('Nie udało się pobrać listy użytkowników')
    return res.status(500).send(errors).end()
  }
}

exports.listOfUsers = listOfUsers
exports.register = register
exports.activateUser = activateUser
