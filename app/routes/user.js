const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

router.put('/activate', userController.activateUser)

module.exports = router
