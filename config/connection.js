const mongoose = require('mongoose')

const PORT = 27017
const DB_NAME = 'patronage'
const ADDRESS = process.env.PRODUCTION_ADDRESS || `mongodb://${process.env.ADDRESS || 'localhost'}:${PORT}/${DB_NAME}`

const connectDb = () => {
  console.log(`DB address: ${ADDRESS}`)
  return mongoose.connect(ADDRESS, { useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports = connectDb
