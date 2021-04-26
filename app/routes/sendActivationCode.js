const express = require('express')

const sendActivationCodeController = require('../controllers/sendActivationCode')

const router = express.Router()

router.post('/:id', sendActivationCodeController.sendActivationCode)

module.exports = router
