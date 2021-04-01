const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')

const usersSampleRoutes = require('./app/routes/users-sample')
const connectDb = require('./config/connection')

const app = express()

dotenv.config()

app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))

const PORT = process.env.PORT || 8080

app.use('/api/users-sample', usersSampleRoutes)

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Patronage JS API',
    version: '1.0.0'
  },
  servers: [
    {
      url: 'http://localhost:8080/api/users-sample',
      description: 'Development server'
    }
  ]
}

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./app/routes/*.js']
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT, () => {
  console.log(`Server started on port http://127.0.0.1:${PORT}`)

  connectDb().then(() => {
    console.log('MongoDB connected')
  })
})
