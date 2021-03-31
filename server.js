const express = require('express')
const helmet = require('helmet')

const app = express()
const usersSampleRoutes = require('./app/routes/users-sample')
const connectDb = require('./config/connection')

app.use(express.json())
app.use(helmet())

const PORT = process.env.PORT || 8080

app.use('/api/users-sample', usersSampleRoutes)

app.listen(PORT, () => {
  console.log(`Server started on port http://127.0.0.1:${PORT}`)

  connectDb().then(() => {
    console.log('MongoDB connected')
  })
})
