'use strict';

// Load express
const express = require('express');
// Load morgan to log requests
const morgan = require('morgan');
// Initialize express app
const app = express();
// Require config.js and create a variable for PORT using object descructuring
const { PORT } = require('./config');
// Mount homemade logger, to be replaced by morgan
// const { requestLogger } = require('./middleware/logger');
// Mount a router
const notesRouter = require('./router/notesRouter');
// Create a static webserver
app.use(express.static('public'));
// Parse request body
app.use(express.json());
// Log all requests
// app.use(requestLogger);
// Use dexter morgan
app.use(morgan('dev'));

app.use('/api', notesRouter);

app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
