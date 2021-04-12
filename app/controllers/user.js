const User = require('../models/user')

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
