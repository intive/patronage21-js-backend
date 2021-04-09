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

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, () => {
  console.log(`Server started on port http://127.0.0.1:${PORT}`)

  connectDb().then(() => {
    console.log('MongoDB connected')
  })
})
