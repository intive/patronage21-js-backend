const express = require('express')

const eventsController = require('../controllers/events')

const router = express.Router()

router.post('/', eventsController.addEvent)
router.delete('/delete/:id', eventsController.deleteEvent)

module.exports = router
