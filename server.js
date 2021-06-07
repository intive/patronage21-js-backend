const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
ajv.addVocabulary(['swagger', 'info', 'basePath', 'tags', 'paths'])

const usersSampleRoutes = require('./app/routes/users-sample')
const usersRoutes = require('./app/routes/user')
const sendActivationCodeRoutes = require('./app/routes/sendActivationCode')
const eventsRoutes = require('./app/routes/events')
dotenv.config()
const connectDb = require('./config/connection')

const app = express()

app.use(cors({
  origin: process.env.IS_PRODUCTION ? 'https://patronage21.herokuapp.com' : 'http://localhost:3000'
}))
app.use(express.json())
app.use(helmet())

if (app.get('env') === 'development') {
  app.use(morgan('dev'))
  console.log('Morgan enabled...')
}

app.use(cookieParser())

const PORT = process.env.PORT || 8080

app.use('/api/users-sample', usersSampleRoutes)
app.use('/api', usersRoutes)
app.use('/api/sendActivationCode', sendActivationCodeRoutes)
app.use('/api/events', eventsRoutes)

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

ajv.addSchema(swaggerDocument, 'swagger.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, () => {
  console.log(`Server started on port http://127.0.0.1:${PORT}`)

  connectDb()
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(`Could not connect to MongoDB. Error message: ${error}`))
})
