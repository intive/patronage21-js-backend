const express = require('express');
const app = express();

app.use(express.json());

// Test data
const books = [
    { id: 1, name: 'book 1' },
    { id: 2, name: 'book 2' },
    { id: 3, name: 'book 3' }
];

// Test routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

app.get('/api/posts', (req, res) => {
    res.send(req.query);
});

// Handle HTTP GET request
app.get('/api/books/:id', (req, res) => {
    const book = books.find(book => book.id === +req.params.id);
    if (!book) {
        res.status(404).send('The book with given ID was not found');
    }
    res.send(book);
});

// Handle HTTP POST request
app.post('/api/books', (req, res) => {
    const book = {
        id: books.length + 1,
        name: req.body.name
    };

    books.push(book);
    res.send(book);
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));