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
      return res.status(500).send('Nieudana rejestracja').end()
    }
  } else {
    let existingUser
    try {
      existingUser = await User.findOne({
        email: email
      })
    } catch (err) {
      return res.status(500).send('Nieudana rejestracja').end()
    }
    try {
      existingUser = await User.findOne({
        login: login
      })
    } catch (err) {
      return res.satus(500).send('Nieudana rejestracja').end()
    }

    if (existingUser) {
      if (!errors.fields.email) {
        errors.fields.email = []
      }
      errors.fields.email.push('Email jest już zajęty')
      if (!errors.fields.login) {
        errors.fields.login = []
      }
      errors.fields.login.push('Login jest już zajęty')
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
  }
  res.status(200).send('Udana rejestracja').end()
}

exports.register = register

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
      return res.status(500).send('Nieudana rejestracja').end()
    }
  }

  const {
    email,
    activationCode
  } = req.body

  try {
    await User.where({ email: email }).findOne((error, existingUser) => {
      if (error) {
        return res.status(500).send('Nieudana aktywacja').end()
      }
      if (!existingUser) {
        return res.status(404).send('Uzytkownik nie istnieje')
      }
      if (existingUser) {
        if (existingUser.active === true) {
          return res.status(409).send('Uzytkownik jest juz aktywny').end()
        } else if (existingUser.activationCode !== activationCode) {
          return res.status(409).send('Bledny kod').end()
        } else if (existingUser.activationCode === activationCode) {
          try {
            User.where({ email: email }).update({ $set: { active: true } }, () => {
              // sendEmail()
              res.status(200).send('Aktywacja udana')
            })
          } catch (err) {
            return res.status(500).send('Nieudana aktywacja').end()
          }
        }
      }
    })
  } catch (err) {
    res.status(500).send('Nieudana aktywacja')
  }
}

exports.activateUser = activateUser
