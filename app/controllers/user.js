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
  const id = req.body.id
  const activationKey = req.body.activationKey
  const query = User.where({ id: id })
  query.findOne(async (err, user) => {
    if (err) {
      res.status(404).send('Cannot find user in database')
    } else {
      if (user.active === true) {
        res.status(409).send('User already active')
      } else {
        if (user.activationKey === activationKey) {
          await
        } else if (user.activationKey !== activationKey) {
          res.status(409).sent('Wrong activation key')
        }

exports.activateUser = async (req, res) => {
  const id = req.body.id
  const activationKey = req.body.activationKey
  const query = User.where({ id: id })
  query.findOne((err, user) => {
    if (err) {
      res.status(404).send('Cannot find user in database')
    } else {
      if (user.activationKey === activationKey) {

      } else if (user.activationKey !== activationKey) {

      }
    }
  })
}

exports.activateUser = activateUser
