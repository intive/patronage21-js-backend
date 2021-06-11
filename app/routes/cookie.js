const express = require('express')

const cookieController = require('../controllers/cookie')

const router = express.Router()

router.post('/signIn', cookieController.sendCookie)
router.get('/signOut', cookieController.deleteCookie)
router.get('/test', cookieController.validateCookie, cookieController.test)

module.exports = router
