const User = require('../models/user')
const generateActivationCode = require('../utils/activationCodeGenerator')
const emailSender = require('../services/mail-sender')

const sendActivationCode = async (req, res) => {
  const errors = {
    fields: {},
    general: []
  }
  const id = req.params.id
  const newActivationCode = generateActivationCode()

  try {
    const user = await User.findOne({ _id: id })
    if (!user) {
      errors.general.push('Użytkownik o podanym id nie istnieje')
      return res.status(404).send(errors).end()
    }

    if (user.active) {
      errors.general.push('Użytkownik jest już aktywny')
      return res.status(409).send(errors).end()
    }

    user.activationCode = newActivationCode
    emailSender.send(user.email, user.activationCode)

    await user.save()

    errors.general.push('Kod aktywacyjny został wysłany pomyśnie')
    return res.status(200).send(errors).end()
  } catch (err) {
    errors.general.push('Wysłanie kodu nie powiodło się')
    errors.fields.message = err
    return res.status(500).send(errors).end()
  }
}

exports.sendActivationCode = sendActivationCode
