# Intive Patronage JS Backend

## Libraries:

1. [express](https://expressjs.com/) - minimalist web framework for Node.js
2. [nodemon](https://nodemon.io/) - monitors changes in the source code and automatically restarts the server
3. ~~[express-validator](https://express-validator.github.io/docs/) - express.js middleware for inputs validation~~
4. [helmet](https://github.com/helmetjs/helmet) - helps secure app by setting various HTTP headers
5. [morgan](http://expressjs.com/en/resources/middleware/morgan.html) -  HTTP request logger middleware for Node.js
6. [mongoose](https://www.npmjs.com/package/mongoose) - object modeling tool for MongoDB designed to work in an asynchronous environment, output validation for schemas
7. [standard.js](https://standardjs.com/) - code formatter

## Useful programs:

1. [Postman](https://www.postman.com/) - tool for testing API endpoints
2. [MongoDB](https://www.mongodb.com/) - general purpose, document-based, distributed database
3. [MongoDB Compass](https://www.mongodb.com/products/compass) - the GUI for MongoDB to explore and manipulate data
4. [Docker](https://www.docker.com/) - tool for  running applications without installation every program used by app

## Setup

### First create .env file

In the project directory, you can run

```
$ cp .env.example .env
```

### Run with Docker

Update your .env

```batch
PORT=
ADDRESS=mongo
```

In the project directory, you can run

```
$ docker-compose up --build
```

Runs the app in the development mode.\
Open [http://localhost:8080/api-docs/](http://localhost:8080/api-docs/) to view API docs in the browser.

If you would like to connect with database using [MongoDB Compass](https://www.mongodb.com/products/compass), that is your connection string:

```
mongodb://YOUR_IP_ADDRESS:27017/patronage
```

### Run with NPM

Update your .env

```batch
PORT=
ADDRESS=
JAVA_ARRD=http://intive-patronage.pl
```

In the project directory, you can run

```
$ npm i
```

Installs the necessary packages

```
$ npm run dev
```

Runs the app in the development mode.\
Open [http://localhost:8080/api-docs/](http://localhost:8080/api-docs/) to view API docs in the browser.

If you would like to connect with database using [MongoDB Compass](https://www.mongodb.com/products/compass), that is your connection string:

```
mongodb://localhost:27017/patronage
```
