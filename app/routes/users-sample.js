const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users-sample')

router.get('/', usersController.getAllUsers)
router.get('/:id', usersController.getSingleUser)
router.post('/new', usersController.addNewUser)
router.put('/edit/:id', usersController.editUser)
router.delete('/delete/:id', usersController.deleteUser)

module.exports = router
