const User = require('../models/user')
const { MAX_AGE_OF_COOKIE } = require('../constants')
const bcrypt = require('bcryptjs')

const validateCookie = async (reg, res, next) => {
  const message = {
    fields: {},
    general: []
  }

  const { cookies } = reg
  console.log(cookies.session_login)
  try {
    if ('session_login' in cookies) {
      console.log('session login exists')
      next()
    } else {
      message.general.push('Brak autoryzacji')
      return res.status(403).send(message)
    }
  } catch (err) {
    message.general.push('Błąd serwera')
    return res.status(500).send(message)
  }
}

const sendCookie = async (req, res) => {
  const message = {
    fields: {},
    general: []
  }

  const { login, password } = req.body

  try {
    const user = await User.findOne({
      login: login
    })
    if (!user) {
      message.fields.login = 'Błędny login'
      return res.status(404).send(message)
    } else {
      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) {
          message.fields.password = 'Błędne hasło'
          return res.status(404).send(message)
        }
        if (isMatch) {
          res.cookie('session_login', user.login, {
            maxAge: MAX_AGE_OF_COOKIE,
            sameSite: 'None',
            secure: true,
            httpOnly: true
          })
          message.general.push('Zalogowano')
          return res.status(200).send(message)
        } else {
          message.fields.password = 'Błędne hasło'
          return res.status(404).send(message)
        }
      })
    }
  } catch (err) {
    message.general.push('Nieudana próba logowania')
    return res.status(500).send(message)
  }
}

const deleteCookie = async (req, res) => {
  const message = {
    fields: {},
    general: []
  }

  try {
    res.cookie('session_login', '', {
      maxAge: 0,
      sameSite: 'None',
      secure: true,
      httpOnly: true
    })
    message.general.push('Wylogowano')
    return res.status(200).send(message)
  } catch (err) {
    message.general.push('Wylogowanie nie powiodło się')
    return res.status(500).send(message)
  }
}

const test = async (req, res) => {
  return res.status(200).send({ msg: 'You are Authenticated' })
}

exports.validateCookie = validateCookie
exports.sendCookie = sendCookie
exports.deleteCookie = deleteCookie
exports.test = test
