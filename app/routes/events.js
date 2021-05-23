const express = require('express')

const eventsController = require('../controllers/events')

const router = express.Router()

router.post('/', eventsController.addEvent)


module.exports = router
