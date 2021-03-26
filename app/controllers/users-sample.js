// example data
const users = [
  { id: 1, name: 'Jan' },
  { id: 2, name: 'Adam' },
  { id: 3, name: 'Zbigniew' }
]

exports.getAllUsers = (_, res) => {
  res.send(users)
}

exports.getSingleUser = (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id))

  if (!user) return res.status(404).send('The user with given ID was not found')

  res.send(user)
}

exports.addNewUser = (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name
  }

  users.push(user)
  res.send(user)
}

exports.editUser = (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id))

  if (!user) return res.status(404).send('The user with given ID was not found')

  user.name = req.body.name
  res.send(user)
}

exports.deleteUser = (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id))

  if (!user) return res.status(404).send('The user with given ID was not found')

  const index = users.indexOf(user)
  users.splice(index, 1)
  res.send(user)
}
