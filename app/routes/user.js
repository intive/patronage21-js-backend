const express = require('express')
const usersController = require('../controllers/user')
const router = express.Router()

router.post('/register', usersController.register)
router.put('/activate', usersController.activateUser)

module.exports = router
