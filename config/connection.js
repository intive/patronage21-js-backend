const mongoose = require('mongoose')

const PORT = 27017
const DB_NAME = 'patronage'
const ADDRESS = `mongodb://mongo:${PORT}/${DB_NAME}`

const connectDb = () => {
  return mongoose.connect(ADDRESS, { useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports = connectDb
