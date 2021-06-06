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
    endDate,
    description
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

  if (new Date(endDate).getTime() <= new Date(startDate).getTime()) {
    if (errors.fields.endDate) {
      errors.fields.endDate.push('Data zakończenia musi być po dacie rozpoczęcia')
    } else {
      errors.fields.endDate = ['Data zakończenia musi być po dacie rozpoczęcia']
    }
  }

  if (Object.keys(errors.fields).length !== 0 || errors.general.length > 0) {
    return res.status(400).send(errors)
  }

  const createdEvent = new Event({
    title: title,
    startDate,
    endDate,
    description
  })

  try {
    await createdEvent.save()
  } catch (err) {
    return res.status(500).send('Dodanie eventu nie powiodło się')
  }

  res.status(200).send(createdEvent)
}

const deleteEvent = async (req, res) => {
  const errors = {
    fields: {},
    general: []
  }

  const id = req.params.id

  try {
    const event = await Event.findByIdAndRemove({ _id: id })
    if (!event) {
      errors.general.push('Usuwanie wydarzenia nie powiodło się')
      return res.status(404).send(errors)
    }
    errors.general.push('Wydarzenie zostało usunięte z kalendarza')
    return res.status(200).send(errors)
  } catch (err) {
    errors.general.push('Usuwanie wydarzenia nie powiodło się')
    return res.status(500).send(errors)
  }
}

const patchEvent = async (req, res) => {
  const id = req.params.id
  let event
  const errors = {
    fields: {},
    general: []
  }

  const {
    title,
    startDate,
    endDate,
    description
  } = req.body

  try {
    event = await Event.findOne({ _id: id })
    if (!event) {
      errors.general.push('Wydarzenie o takim id nie istnieje')
    }
  } catch (err) {
    errors.general.push('Usuwanie wydarzenia nie powiodło się')
  }

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
      return res.status(500).send('Edycja eventu nie powiodła się')
    }
  }

  if (new Date(endDate).getTime() <= new Date(startDate).getTime()) {
    if (errors.fields.endDate) {
      errors.fields.endDate.push('Data zakończenia musi być po dacie rozpoczęcia')
    } else {
      errors.fields.endDate = ['Data zakończenia musi być po dacie rozpoczęcia']
    }
  }

  if (Object.keys(errors.fields).length !== 0 || errors.general.length > 0) {
    return res.status(400).send(errors)
  }

  try {
    await event.update({
      title,
      startDate,
      endDate,
      description
    })
  } catch (err) {
    return res.status(500).send('Edycja eventu nie powiodła się')
  }

  res.status(200).send('Wydarzenie zostało zedytowane')
}

exports.addEvent = addEvent
exports.deleteEvent = deleteEvent
exports.patchEvent = patchEvent
