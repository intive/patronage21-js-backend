const User = require('../models/user')

exports.activateUser = async (req, res) => {
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
      }
    }
  })
}
