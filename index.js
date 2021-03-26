const express = require('express')
const helmet = require('helmet')
const { checkSchema, validationResult } = require('express-validator')
const app = express()

// middleware pipeline
app.use(express.json())
app.use(helmet())
// ? maybe use morgan for requests logging if needed, but should be configured only for development environment
/*
    if (app.get('env') === 'development') {
        app.use(morgan('tiny'));
        console.log('Morgan enabled ...');
    }
 */

// Test data
const books = [
  { id: 1, name: 'book 1' },
  { id: 2, name: 'book 2' },
  { id: 3, name: 'book 3' }
]

const booksSchema = {
  name: {
    isLength: {
      errorMessage: 'Name should be at least 5 characters long',
      options: {
        min: 5
      }
    }
  }
}

// Test routes
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/api/courses', (req, res) => {
  res.send([1, 2, 3])
})

app.get('/api/courses/:id', (req, res) => {
  res.send(req.params.id)
})

app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.params)
})

app.get('/api/posts', (req, res) => {
  res.send(req.query)
})

// Handle HTTP GET requests
app.get('/api/books', (req, res) => {
  res.send(books)
})

app.get('/api/books/:id', (req, res) => {
  const book = books.find(book => book.id === +req.params.id)
  if (!book) {
    return res.status(404).send('The book with given ID was not found')
  }
  res.send(book)
})

// Handle HTTP POST request
app.post('/api/books', (req, res) => {
  const book = {
    id: books.length + 1,
    name: req.body.name
  }

  books.push(book)
  res.send(book)
})

// Handle HTTP PUT request with validation
app.put(
  '/api/books/:id',
  checkSchema(booksSchema),
  (req, res) => {
    const book = books.find(book => book.id === +req.params.id)
    if (!book) {
      return res.status(404).send('The book with given ID was not found')
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    };

    book.name = req.body.name
    res.send(book)
  }
)

// Handle HTTP DELETE request
app.delete('/api/books/:id', (req, res) => {
  const book = books.find(book => book.id === +req.params.id)
  if (!book) {
    return res.status(404).send('The book with given ID was not found')
  }

  const index = books.indexOf(book)
  books.splice(index, 1)

  res.send(book)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
