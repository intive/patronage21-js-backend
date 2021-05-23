const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
require('ajv-errors')(ajv /*, {singleError: true} */)
ajv.addVocabulary(['swagger', 'info', 'basePath', 'tags', 'paths'])
const swaggerSchema = require('../../swagger.json')
ajv.addSchema(swaggerSchema, 'swagger.json')
const Event = require('../models/event')

const addEvent = async (req, res, next) => {
  const errors = {
    fields: {},
    general: []
  }

  const {
    title,
    startDate,
    endDate
  } = req.body

  const validateEvent = ajv.compile({ $ref: 'swagger.json#/definitions/Event' })
  const valid = validateEvent(req.body)
  if (!valid) {
    try {
      validateEvent.errors.forEach(element => {
        if (element.instancePath === '') {
          const field = element.params.errors[0].params.missingProperty
          errors.fields[field] = [element.message]
        } else {
          const field = element.instancePath.split('/')[1]
          if (!errors.fields[field]) {
            errors.fields[field] = [element.message]
          } else {
            errors.fields[field].push(element.message)
          }
        }
      })
    } catch (err) {
      return res.status(500).send('Dodanie eventu nie powiodło się')
    }
  }

  if (Object.keys(errors.fields).length !== 0 || errors.general.length > 0) {
    return res.status(400).send(errors)
  }

  const createdEvent = new Event({
    title: title,
    startDate,
    endDate
  })

  try {
    await createdEvent.save()
  } catch (err) {
    return res.status(500).send('Dodanie eventu nie powiodło się')
  }

  res.status(200).send(createdEvent)
}

exports.addEvent = addEvent
