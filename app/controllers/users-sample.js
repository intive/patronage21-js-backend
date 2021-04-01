const UserSample = require('../models/user-sample')

exports.getAllUsers = async (_, res) => {
  const users = await UserSample.find()

  res.json(users)
}

exports.getSingleUser = async (req, res) => {
  const id = req.params.id

  await UserSample.findOne({ _id: id }, (err, docs) => {
    if (err) res.status(404).send('The user with given ID was not found')
    else res.send(docs)
  })
}

exports.addNewUser = async (req, res) => {
  const user = new UserSample({ name: req.body.name })

  await user.save()
  res.send('The user was created successfully')
}

exports.editUser = async (req, res) => {
  const id = req.params.id
  const name = req.body.name

  await UserSample.updateOne({ _id: id }, { name: name }, (err) => {
    if (err) res.status(404).send('The user with given ID was not found')
    else res.send('The user with given ID was edited')
  })
}

exports.deleteUser = async (req, res) => {
  const id = req.params.id

  await UserSample.deleteOne({ _id: id }, (err) => {
    if (err) res.status(404).send('The user with given ID was not found')
    else res.send('The user with given ID was deleted')
  })
}
