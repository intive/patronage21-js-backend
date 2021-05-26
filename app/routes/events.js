const express = require('express')

const eventsController = require('../controllers/events')

const router = express.Router()

router.post('/', eventsController.addEvent)
router.patch('/:id', eventsController.patchEvent)
router.delete('/delete/:id', eventsController.deleteEvent)
router.get('/list/:fromDate/:toDate?', eventsController.listOfEvents)

module.exports = router
