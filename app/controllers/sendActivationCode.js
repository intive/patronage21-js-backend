const User = require('../models/user')
const generateActivationCode = require('../utils/activationCodeGenerator')
const emailSender = require('../services/mail-sender')

const sendActivationCode = async (req, res) => {
  const id = req.params.id
  const newActivationCode = generateActivationCode()

  const user = await User.findOne({ _id: id }, (error, docs) => {
    if (error) {
      res.status(404).send('Użytkownik o podanym id nie istnieje')
    } else {
      return docs
    }
  })

  try {
    user.activationCode = newActivationCode
    await user.save()

    res.status(200).send('Kod aktywacyjny został wysłany pomyśnie')
  } catch (error) {
    return res.status(500).send('Wysłanie kodu nie powiodło się', error).end()
  }

  // * send an e-mail template
  emailSender.send(user.email, user.activationCode)
}

exports.sendActivationCode = sendActivationCode
