# Intive Patronage JS Backend

## Libraries:

1. [Express](https://expressjs.com/) - minimalist web framework for Node.js
2. [nodemon](https://nodemon.io/) - monitors changes in the source code and automatically restarts the server
3. ~~[express-validator](https://express-validator.github.io/docs/) - express.js middleware for inputs validation~~
4. [helmet](https://github.com/helmetjs/helmet) - helps secure app by setting various HTTP headers
5. [morgan](http://expressjs.com/en/resources/middleware/morgan.html) - HTTP request logger middleware for Node.js
6. [mongoose]('https://www.npmjs.com/package/mongoose') - object modeling tool for MongoDB designed to work in an asynchronous environment, output validation for schemas
7. [standard.js](https://standardjs.com/) - code formatter

## Useful programs:

1. [Postman](https://www.postman.com/) - tool for testing API endpoints
2. [MongoDB](https://www.mongodb.com/) - general purpose, document-based, distributed database
3. [MongoDB Compass](https://www.mongodb.com/products/compass) - the GUI for MongoDB to explore and manipulate data
4. [Docker](https://www.docker.com/) - tool for running applications without installation every program used by app

## Setup

To run this project, install it locally using [Docker](https://www.docker.com/):

Add to .env file

```
ADDRESS=mongo
```

### Available Scripts

In the project directory, you can run:

```
$ docker-compose up --build
```

Runs the app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.<br /><br />

If you would like to connect with database using [MongoDB Compass](https://www.mongodb.com/products/compass), that is your connection string:

```
mongodb://YOUR_IP_ADDRESS:27017/patronage
```
