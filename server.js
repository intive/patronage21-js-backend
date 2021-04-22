const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const cors = require('cors')

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
ajv.addVocabulary(['swagger', 'info', 'basePath', 'tags', 'paths'])

const usersSampleRoutes = require('./app/routes/users-sample')
const usersRoutes = require('./app/routes/user')
dotenv.config()
const connectDb = require('./config/connection')

const app = express()

app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))

const PORT = process.env.PORT || 8080

app.use('/api/users-sample', usersSampleRoutes)
app.use('/api', usersRoutes)

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

ajv.addSchema(swaggerDocument, 'swagger.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, () => {
  console.log(`Server started on port http://127.0.0.1:${PORT}`)

  connectDb().then(() => {
    console.log('MongoDB connected')
  })
})
