const User = require('../models/user')
const generateActivationCode = require('../utils/activationCodeGenerator')
const emailSender = require('../services/mail-sender')

const sendActivationCode = async (req, res) => {
  const id = req.params.id
  const newActivationCode = generateActivationCode()

  try {
    const user = await User.findOne({ _id: id })
    if (!user) {
      return res.status(404).json('Użytkownik o podanym id nie istnieje')
    }
    if (user.active) {
      return res.status(409).json('Użytkownik jest już aktywny')
    }
    user.activationCode = newActivationCode
    emailSender.send(user.email, user.activationCode)
    await user.save()
    return res.status(200).json('Kod aktywacyjny został wysłany pomyślnie')
  } catch (err) {
    return res.status(500).json('Wysłanie kodu nie powiodło się')
  }
}

exports.sendActivationCode = sendActivationCode
