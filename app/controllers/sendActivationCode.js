const User = require('../models/user')
const generateActivationCode = require('../utils/activationCodeGenerator')

const sendActivationCode = async (req, res) => {
  const id = req.params.id
  const newActivationCode = generateActivationCode()
  console.log('new code: ', newActivationCode)

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
    return res.status(500).send('Wysłanie kodu nie powiodło się').end()
  }

  // ? send an email
}

exports.sendActivationCode = sendActivationCode
